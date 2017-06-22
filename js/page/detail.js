$(function() {

    var Index = {};

    Index.init = function() {
        var self = this;
        timeout = '';
        self.initEvent();
    };

    Index.initEvent = function() {
        var self = this;
        console.log(2);
        // Unit selector changed

        $(document).on('change', '.unit-changer', self.changeSizeUnit);

        $(document).on('change', 'input[type="checkbox"]', self.handleContainer);

        $(document).on('change keyup', '.size-percentage', function() {

            var element = $(this);

            window.clearInterval(timeout);
            timeout = window.setInterval(function() {
                self.handleSizeCombinations(element);
            }, 500);
        });

        $(document).on('click', 'input[type="submit"]', self.checkContainer);

    };
    /*
     * Draggable slider
     */
    Index.slider = function() {
        var self = this;

        var onSlider = function(e) {
            var columns = $(e.currentTarget).find("td");
            var ranges = [],
                total = 0,
                i, s = "Ranges: ",
                w;

            for (i = 0; i < columns.length; i++) {
                w = columns.eq(i).width() - 10 - (i == 0 ? 1 : 0);
                ranges.push(w);
                total += w;
            }
            for (i = 0; i < columns.length; i++) {
                ranges[i] = 100 * ranges[i] / total;
                // $('input#item' + [i+1]).val(Math.round(ranges[i]));
            }

            // Iterate over sizes, assign new range
            $('.size input[type="number"]').each(function(val) {
                this.value = self.checkNumber(ranges.reverse().pop());
            })
        };

        $("#container-bar").colResizable({
            liveDrag: true,
            draggingClass: "rangeDrag",
            gripInnerHtml: "<div class='rangeGrip'></div>",
            onDrag: onSlider,
            minWidth: 8
        });
    };

    /*
     * Function that will change the size unit
     */
    Index.changeSizeUnit = function() {
        $('input[type="checkbox"]').prop("checked", false);
        $('input[type="radio"]').prop("checked", false);
        $('tr[data-unit]').hide().find('input[type=radio]').prop('checked', false);
        $('tr[data-unit="' + $(this).val() + '"]').show().first().find('input[type=radio]').prop('checked', false);


        if ($('#Unit').val() == 'Box') {
            $('#selected-container-sizes').empty();
            $('.container-wrapper').hide();
            $('tr[data-unit="' + $(this).val() + '"]').show().first().find('input[type=radio]').prop('checked', true);
        } else {
            $('.container-wrapper').show();
        }
    };


    /**
     * Handle the container percentages
     */
    Index.handleContainer = function() {
        $('table#container-bar tbody tr').html('');

        $('#selected-container-sizes').html('');

        $('input[type="checkbox"]').each(function() {

            if ($(this).is(':checked')) {
                if ($('table#container-bar tbody tr').find('td' + $(this).data('size')).length === 0) {
                    //first disable colResizable always before any DOM manipulation
                    $("#container-bar").colResizable({ disable: true });
                    //add a column (you can do it as you want, this is just an example)
                    var i = 0;
                    var tr = $("table#container-bar tr");

                    tr.append("<td id='" + $(this).data('size') + "'></td>");
                    //since now we have more columns, lets share the table width proportionally
                    var td = $("table#container-bar tr td");
                    td.width(100 / td.length + "%");
                }

                Index.addCombinedSizes($(this).data('size'), $(this).data('webshopproductvariantdetailid'));

                if ($('input[type="checkbox"]:checked').length == 1) {
                    $('.container-wrapper').hide();
                    $('#combinedContainerQuantity').addClass('disabled');
                } else {
                    $('.container-wrapper').show();
                }
            }
        });

        //apply colResizable again to be able to drag columns
        Index.slider();
    };


    Index.addCombinedSizes = function(size, detailid) {
        var element = '';
        element += '<div class="form-group col-sm-6 size" id="' + size + '">';
        element += '<label for="item1" class="col-sm-4 control-label">' + size + ' : </label>';
        element += '<div class="col-sm-8">';
        element += '<input type="number" id="combinedContainerQuantity" name="ContainerQuantity[' + detailid + ']" min="0" max="100" class="form-control size-percentage percentage" value="' + Math.round(100 / $('input[type="checkbox"]:checked').length) + '"/>';
        element += '<span class="input-group-addon">%</span>';
        //element += '<input type="hidden" name="WebshopProductVariantID" class="form-control" value="" />';
        element += '</div>';
        element += '</div>';

        $('#selected-container-sizes').append(element);
    };

    Index.handleSizeCombinations = function(element) {

        //first disable colResizable always before any DOM manipulation
        $("#container-bar").colResizable({ disable: true });

        var changedSize;

        window.clearInterval(timeout);

        // On change, get new value of changed size
        changedSize = element.context.value;
        changedSize = this.checkNumber(changedSize);

        // Calculate other sizes
        var markers = $('#container-bar td');
        var totalLength = $('#container-bar').width();
        var self = this;
        var newWidth = totalLength * (changedSize / 100) + "px";

        $('.size input[type="number"]').each(function(key, element) {
            var width = totalLength * ($(element).val() / 100) + "px";
            markers[key].style.width = width;
            // console.log(width);
        });

        //apply colResizable again to be able to drag columns
        Index.slider();
    };

    Index.checkNumber = function(percentage) {
        if (percentage > 100) {
            percentage = 100;
        } else if (percentage < 0) {
            percentage = 0;
        }

        // Steps of 5
        // return Math.round(percentage / 5) * 5;

        return Math.round(percentage);
    }

    Index.resetCheckboxes = function() {
            console.log("Resetting checkboxes");
        }
        // Check if container is filled
    Index.checkContainer = function() {
        if ($('.unit-changer').val() != "Box") {
            var totalPercentage = 0;

            $('.size input[type="number"]').each(function(key, element) {
                totalPercentage = totalPercentage + parseInt($(element).val());
            });

            if (totalPercentage != 100) {
                alert('Please make sure the sum of your combined container is equal to 100.')
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    Index.init();
});