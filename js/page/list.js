$(function() {

    var Index = {};

    Index.init = function() {
        var self = this;
        self.initEvent();
    };

    Index.initEvent = function() {
        var self = this;
        console.log(2);

        // Unit selector changed
        $(document).on('change', '.unit-changer', function() {
            self.changeSizeUnit($(this).closest('form').data('templateid'));
        });

        // Checkbox changed
        $(document).on('change', 'input[type="checkbox"]', function() {
            self.handleContainer($(this).closest('form').data('templateid'));
        });

        $(document).on('click', 'input[type="submit"]', function() {
            self.checkContainer($(this).closest('form').data('templateid'));
        });

        $(document).on('click', '.J_switch', function() {
            var self = $(this);

            if (self.hasClass('active')) {
                return;
            }

            self.addClass('active').siblings('label').removeClass('active');
            $(self.attr('data-id')).removeClass('none').siblings().addClass('none');
        });

        $(document).on('click', '.J_dropdown', function(e) {
            e.stopPropagation();
            $(this).siblings('.dropdown-menu').show();
        });
        $(document).on('click', function() {
            $('.dropdown-menu').hide();
        });
    };
    /*
     * Draggable slider
     */
    Index.slider = function(templateid) {
        var self = this;

        var onSlider = function(e) {
            var columns = $(e.currentTarget).find("td");
            var ranges = [],
                total = 0,
                i, s = "Ranges: ",
                w;
            var currentTable = '#' + $(e.currentTarget).closest('table').attr('id');

            for (i = 0; i < columns.length; i++) {
                w = columns.eq(i).width() - 10 - (i == 0 ? 1 : 0);
                ranges.push(w);
                total += w;
            }

            for (i = 0; i < columns.length; i++) {
                ranges[i] = 100 * ranges[i] / total;
                // $(currentTable + ' input#combinedContainerQuantity' + [i+1]).val(Math.round(ranges[i]));
            }

            // Iterate over sizes, assign new range
            $(currentTable).closest('.combined-container-wrapper').find('.combinedContainerQuantity').each(function(val) {
                this.value = self.checkNumber(ranges.reverse().pop());
            })
        };

        $("#container-bar-" + templateid).colResizable({
            liveDrag: true,
            draggingClass: "rangeDrag",
            gripInnerHtml: "<div class='rangeGrip'></div>",
            onDrag: onSlider,
            minWidth: 8
        });
    };

    Index.handleContainer = function(templateid) {
        var self = this;
        $('table#container-bar-' + templateid + ' tbody tr').html('');

        // Empty the html of this div
        $('.selected-container-sizes-' + templateid).html('');

        // Define container for this product
        container = $('form[data-templateid="' + templateid + '"] input[type="checkbox"]').closest('.list-product');

        // Loop over checkboxes in container
        $(container.find('input[type="checkbox"]').each(function(key, value) {
            if ($(this).is(':checked')) {
                console.log('test');
                var barContainer = container.find('table#container-bar-' + templateid + ' tbody tr');

                // resizable bar
                if (barContainer.find('td' + $(this).data('size')).length === 0) {
                    //first disable colResizable always before any DOM manipulation
                    container.find("#container-bar-" + templateid).colResizable({ disable: true });
                    //add a column (you can do it as you want, this is just an example)
                    var i = 0;
                    var tr = container.find("table#container-bar-" + templateid + " tr");

                    tr.append("<td id='" + $(this).data('size') + "'></td>");

                    //since now we have more columns, lets share the table width proportionally
                    var td = container.find("table#container-bar-" + templateid + " tr td");
                    td.width(100 / td.length + "%");
                }

                // Add the size to the html
                self.addCombinedSizes(templateid, container, $(this).data('size'), $(this).data('webshopproductvariantdetailid'));

                if (container.find('input[type="checkbox"]:checked').length == 1) {
                    container.find('.combined-container-wrapper').addClass('hidden');
                } else {
                    container.find('.combined-container-wrapper').removeClass('hidden');
                }
            }
        }));

        //apply colResizable again to be able to drag columns
        self.slider(templateid);
    };

    Index.addCombinedSizes = function(templateid, container, size, detailid) {
        var element = '';
        element += '<div class="form-group col-sm-6 size" id="' + size + '">';
        element += '<label for="combinedContainerQuantity" class="col-sm-4 control-label">' + size + ' : </label>';
        element += '<div class="col-sm-8">';
        element += '<input type="number" id="combinedContainerQuantity" name="ContainerQuantity[' + detailid + ']" min="0" max="100" class="form-control size-percentage percentage combinedContainerQuantity" value="' + Math.round(100 / container.find('input[type="checkbox"]:checked').length) + '"/>';
        element += '<span class="input-group-addon">%</span>';
        //element += '<input type="hidden" name="WebshopProductVariantID" class="form-control" value="" />';
        element += '</div>';
        element += '</div>';

        container.find('.selected-container-sizes-' + templateid).append(element);
    };
    /*
     * Function that will change the size unit
     */
    Index.changeSizeUnit = function(templateid) {
        var container = $('form[data-templateid="' + templateid + '"]').closest('.list-product');

        container.find('input[type="checkbox"]').prop('checked', false);
        container.find('input[type="radio"]').prop('checked', false);

        if (container.find('.unit-changer').val() == 'Box') {
            container.find('.selected-container-sizes-' + templateid).empty();
            container.find('.combined-container-wrapper').hide();
            container.find('input[type="radio"]').show().first().prop('checked', true);

            container.find('tr[data-unit="' + container.find('.unit-changer').val() + '"]').show().first().find('input[type=radio]').prop('checked', true);
            container.find('tr[data-unit="' + 'Container' + '"]').hide();

        } else {
            if (container.find('input[type="checkbox"]:checked').length > 1) {
                container.find('.combined-container-wrapper').show();
            }
            container.find('input[type="checkbox"]').first().prop('checked', true);
            container.find('tr[data-unit="' + container.find('.unit-changer').val() + '"]').show().first().find('input[type=radio]').prop('checked', false);
            container.find('tr[data-unit="' + 'Box' + '"]').hide();


        }
    };

    // Check if container is filled
    Index.checkContainer = function(templateid) {
        // Define container
        container = $('form[data-templateid="' + templateid + '"]').closest('.list-product');

        // If unit is container
        if (container.find('.unit-changer').val() != "Box") {
            var totalPercentage = 0;

            // Count total percentage
            container.find('.size input[type="number"]').each(function(key, element) {
                totalPercentage = totalPercentage + parseInt($(element).val());
            });
            // If total percentage differs from 100 stop execution
            if (totalPercentage != 100) {
                alert('Please make sure the sum of your combined container is equal to 100.')
                return event.preventDefault();
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    Index.checkNumber = function(percentage) {
        if (percentage > 100) {
            percentage = 100;
        } else if (percentage < 0) {
            percentage = 0;
        }

        // Steps of 5
        // return Math.round(percentage / 5) * 5;

        return Math.round(percentage);
    };
    Index.init();
});