if (typeof jQuery === "undefined") { throw new Error("Bootstrap's JavaScript requires jQuery") }

/*jshint sub:true*/
/*
 * js come from :bootstrap-datepicker.js
 * Started by Stefan Petre; improvements by Andrew Rowls + contributors
 * you con get the source from github: https://github.com/eternicode/bootstrap-datepicker
 */
! function($, undefined) {

	var $window = $(window);

	function UTCDate() {
		return new Date(Date.UTC.apply(Date, arguments));
	}

	function UTCToday() {
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}

	function alias(method) {
		return function() {
			return this[method].apply(this, arguments);
		};
	}

	var DateArray = (function() {
		var extras = {
			get: function(i) {
				return this.slice(i)[0];
			},
			contains: function(d) {
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i = 0, l = this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i) {
				this.splice(i, 1);
			},
			replace: function(new_array) {
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function() {
				this.length = 0;
			},
			copy: function() {
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function() {
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options) {
		this.dates = new DateArray();
		this.viewDate = UTCToday();
		this.focusDate = null;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .sui-btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if (this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);

		if (this.o.timepicker) {
			this.timepickerContainer = this.picker.find('.timepicker-container');
			this.timepickerContainer.timepicker();
			this.timepicker = this.timepickerContainer.data('timepicker');
			this.timepicker._render();
			//this.setTimeValue();
		}

		this._buildEvents();
		this._attachEvents();

		if (this.isInline) {
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		} else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl) {
			this.picker.addClass('datepicker-rtl');
		}

		if (this.o.size === 'small') {
			this.picker.addClass('datepicker-small');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today')
			.attr('colspan', function(i, val) {
				return parseInt(val) + 1;
			});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline) {
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts) {
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]) {
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch (o.startView) {
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode) {
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true) {
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
				else
					o.multidate = 1;
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity) {
				if (!!o.startDate) {
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				} else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity) {
				if (!!o.endDate) {
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				} else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled || [];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d) {
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word) {
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {
				x: 'auto',
				y: 'auto'
			};
			if (!_plc || _plc === 'auto')
			; // no action
			else if (plc.length === 1) {
				switch (plc[0]) {
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			} else {
				_plc = $.grep(plc, function(word) {
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word) {
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs) {
			for (var i = 0, el, ch, ev; i < evs.length; i++) {
				el = evs[i][0];
				if (evs[i].length === 2) {
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3) {
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs) {
			for (var i = 0, el, ev, ch; i < evs.length; i++) {
				el = evs[i][0];
				if (evs[i].length === 2) {
					ch = undefined;
					ev = evs[i][1];
				} else if (evs[i].length === 3) {
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function() {
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e) {
							if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			} else if (this.component && this.hasInput) { // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(function(e) {
							if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
								this.update();
						}, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			} else if (this.element.is('div')) { // inline datepicker
				this.isInline = true;
			} else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			//timepicker change
			if (this.o.timepicker) {
				this._events.push(
					[this.timepickerContainer, {
						'time:change': $.proxy(this.timeChange, this)
					}]
				)
			}

			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e) {
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e) {
						this._focused_from = e.target;
					}, this)
				}]
			);

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					'mousedown touchstart': $.proxy(function(e) {
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)) {
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function() {
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function() {
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function() {
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
			if (this.o.timepicker) {
				this.timepicker._attachSecondaryEvents();
			}
		},
		_detachSecondaryEvents: function() {
			this._unapplyEvents(this._secondaryEvents);
			if (this.o.timepicker) {
				this.timepicker._detachSecondaryEvents();
			}
		},
		_trigger: function(event, altdate) {
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format) {
					if (arguments.length === 0) {
						ix = this.dates.length - 1;
						format = this.o.format;
					} else if (typeof ix === 'string') {
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},
		timeChange: function(e) {
			this.setValue();
		},
		show: function(e) {
			if (e && e.type === "focus" && this.picker.is(":visible")) return;
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.place();
			this._attachSecondaryEvents();
			if (this.o.timepicker) {
				this.timepicker._show();
			}
			this._trigger('show');
		},

		hide: function() {
			if (this.isInline)
				return;
			if (!this.picker.is(':visible'))
				return;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			if (this.o.timepicker) {
				this.timepicker._hide();
			}
			this._trigger('hide');
		},

		remove: function() {
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput) {
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc) {
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));
		},
		_local_to_utc: function(local) {
			return local && new Date(local.getTime() - (local.getTimezoneOffset() * 60000));
		},
		_zero_time: function(local) {
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc) {
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function() {
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function() {
			return $.map(this.dates, function(d) {
				return new Date(d);
			});
		},

		getDate: function() {
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function() {
			return new Date(this.dates.get(-1));
		},

		setDates: function() {
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
		},

		setUTCDates: function() {
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),

		setValue: function() {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component) {
					this.element.find('input').val(formatted).change();
				}
			} else {
				this.element.val(formatted).change();
			}
		},

		setTimeValue: function() {
			var val, minute, hour, time;
			time = {
				hour: (new Date()).getHours(),
				minute: (new Date()).getMinutes()
			};
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element) {

				val = $.trim(element.val());
				if (val) {
					var tokens = val.split(" "); //datetime
					if (tokens.length === 2) {
						val = tokens[1];
					}
				}
				val = val.split(':');
				for (var i = val.length - 1; i >= 0; i--) {
					val[i] = $.trim(val[i]);
				}
				if (val.length === 2) {
					minute = parseInt(val[1], 10);
					if (minute >= 0 && minute < 60) {
						time.minute = minute;
					}
					hour = parseInt(val[0].slice(-2), 10);
					if (hour >= 0 && hour < 24) {
						time.hour = hour;
					}
				}
			}
			this.timepickerContainer.data("time", time.hour + ":" + time.minute);
		},

		getFormattedDate: function(format) {
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			var text = $.map(this.dates, function(d) {
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
			if (this.o.timepicker) {
				if (!text) {
					text = DPGlobal.formatDate(new Date(), format, lang);
				}
				text = text + " " + this.timepickerContainer.data('time');
			}
			return text;
		},

		setStartDate: function(startDate) {
			this._process_options({
				startDate: startDate
			});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate) {
			this._process_options({
				endDate: endDate
			});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled) {
			this._process_options({
				daysOfWeekDisabled: daysOfWeekDisabled
			});
			this.update();
			this.updateNavArrows();
		},

		place: function() {
			if (this.isInline)
				return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var zIndex = parseInt(this.element.parents().filter(function() {
				return $(this).css('z-index') !== 'auto';
			}).first().css('z-index')) + 10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom ' +
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto') {
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto') {
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height + 6;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top')) + 6;

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},
		_getTime:function(date){
			var h,m;
			date  = new Date(date);
			h = date.getHours();
			if (h<10) {
				h = "0" + h;
			}
			m = date.getMinutes();
			if (m<10) {
				m = "0" + m;
			}
			return h + ":" + m;
		},
		_allow_update: true,
		update: function() {
			if (!this._allow_update)
				return;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length) {
				$.each(arguments, $.proxy(function(i, date) {
					//获取第一个的时间,用来update 时间
					if (this.o.timepicker&&i === 0) {
						
						this.timepicker.update(this._getTime(date)); //不要更新input
					}
					if (date instanceof Date)
						date = this._local_to_utc(date);
					else if(typeof date == "string" && this.o.timepicker){
						date = date.split(" ")[0];
					}
					dates.push(date);
				}, this));
				fromArgs = true;


				
			} else {
				dates = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
				if (dates&&this.o.timepicker) {//合体模式
					var tokens = dates.split(" ");
					if (tokens.length === 2) {  //有时间
						dates = tokens[0];
						//调用timepicker 的_updateUI
						this.timepicker.update(tokens[1],true); //不要更新input
					}
				}
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date) {
				return DPGlobal.parseDate(date, this.o.format, this.o.language);
			}, this));
			dates = $.grep(dates, $.proxy(function(date) {
				return (
					date < this.o.startDate ||
					date > this.o.endDate ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);

			if (fromArgs) {
				// setting date by clicking
				this.setValue();
			} else if (dates.length) {
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
		},

		fillDow: function() {
			var dowCnt = this.o.weekStart,
				html = '<tr class="week-content">';
			if (this.o.calendarWeeks) {
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7) {
				html += '<th class="dow">' + dates[this.o.language].daysMin[(dowCnt++) % 7] + '</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function() {
			var html = '',
				i = 0;
			while (i < 12) {
				html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + '</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range) {
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d) {
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date) {
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)) {
				cls.push('old');
			} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)) {
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()) {
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
				cls.push('disabled');
			}
			if (this.range) {
				if (date > this.range[0] && date < this.range[this.range.length - 1]) {
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1) {
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				tooltip;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
				.text(year + '年 ' + dates[this.o.language].months[month]);
			this.picker.find('tfoot th.today')
				.text(todaytxt)
				.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
				.text(cleartxt)
				.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month - 1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() === this.o.weekStart) {
					html.push('<tr>');
					if (this.o.calendarWeeks) {
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
						// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek = (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">' + calWeek + '</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop) {
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {
							enabled: before
						};
					else if (typeof(before) === 'string')
						before = {
							classes: before
						};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				var currentDate;
				var today = new Date();
				if (this.o.todayHighlight &&
					prevMonth.getUTCFullYear() === today.getFullYear() &&
					prevMonth.getUTCMonth() === today.getMonth() &&
					prevMonth.getUTCDate() === today.getDate()) {
					currentDate = '今日';
				} else {
					currentDate = prevMonth.getUTCDate();
				}
				html.push('<td class="' + clsName.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + 'data-day="' + prevMonth.getUTCDate() + '"' + '>' + currentDate + '</td>');
				if (prevMonth.getUTCDay() === this.o.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var months = this.picker.find('.datepicker-months')
				.find('th:eq(1)')
				.text(year)
				.end()
				.find('span').removeClass('active');

			$.each(this.dates, function(i, d) {
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year === startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear) {
				months.slice(endMonth + 1).addClass('disabled');
			}

			html = '';
			year = parseInt(year / 10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
				.find('th:eq(1)')
				.text(year + '-' + (year + 9))
				.end()
				.find('td');
			year -= 1;
			var years = $.map(this.dates, function(d) {
					return d.getUTCFullYear();
				}),
				classes;
			for (var i = -1; i < 11; i++) {
				classes = ['year'];
				if (i === -1)
					classes.push('old');
				else if (i === 10)
					classes.push('new');
				if ($.inArray(year, years) !== -1)
					classes.push('active');
				if (year < startYear || year > endYear)
					classes.push('disabled');
				html += '<span class="' + classes.join(' ') + '">' + year + '</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function() {
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode) {
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({
							visibility: 'hidden'
						});
					} else {
						this.picker.find('.prev').css({
							visibility: 'visible'
						});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
						this.picker.find('.next').css({
							visibility: 'hidden'
						});
					} else {
						this.picker.find('.next').css({
							visibility: 'visible'
						});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({
							visibility: 'hidden'
						});
					} else {
						this.picker.find('.prev').css({
							visibility: 'visible'
						});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({
							visibility: 'hidden'
						});
					} else {
						this.picker.find('.next').css({
							visibility: 'visible'
						});
					}
					break;
			}
		},

		click: function(e) {
			e.preventDefault();
			if ($(e.target).parents(".timepicker-container")[0]) {
				return;
			}
			var target = $(e.target).closest('span, td, th'),
				year, month, day;
			if (target.length === 1) {
				switch (target[0].nodeName.toLowerCase()) {
					case 'th':
						switch (target[0].className) {
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1);
								switch (this.viewMode) {
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn === 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this.update();
								this._trigger('changeDate');
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled') && !target.is('[data-num]')) {
							this.viewDate.setUTCDate(1);
							if (target.is('.month')) {
								day = 1;
								month = target.parent().find('span').index(target);
								year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1) {
									this._setDate(UTCDate(year, month, day));
								}
							} else {
								day = 1;
								month = 0;
								year = parseInt(target.text(), 10) || 0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2) {
									this._setDate(UTCDate(year, month, day));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')) {
							day = target.data('day');
							day = parseInt(day, 10) || 1;
							year = this.viewDate.getUTCFullYear();
							month = this.viewDate.getUTCMonth();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month === 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day));
						}
						break;
				}
			}
			if (this.picker.is(':visible') && this._focused_from) {
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date) {
			var ix = this.dates.contains(date);
			if (!date) {
				this.dates.clear();
			} else if (ix !== -1) {
				this.dates.remove(ix);
			} else {
				this.dates.push(date);
			}
			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which) {
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component) {
				element = this.element.find('input');
			}
			if (element) {
				element.change();
			}
			if (this.o.autoclose && (!which || which === 'date')) {
				this.hide();
			}
		},

		moveMonth: function(date, dir) {
			if (!date)
				return undefined;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1) {
				test = dir === -1
				// If going back one month, make sure month is not current month
				// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
				? function() {
					return new_date.getUTCMonth() === month;
				}
				// If going forward one month, make sure month is as expected
				// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
				: function() {
					return new_date.getUTCMonth() !== new_month;
				};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i = 0; i < mag; i++)
				// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function() {
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()) {
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir) {
			return this.moveMonth(date, dir * 12);
		},

		dateWithinRange: function(date) {
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e) {
			if (this.picker.is(':not(:visible)')) {
				if (e.keyCode === 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, newDate, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode) {
				case 27: // escape
					if (this.focusDate) {
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					} else
						this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 37 ? -1 : 1;
					if (e.ctrlKey) {
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey) {
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)) {
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation)
						break;
					dir = e.keyCode === 38 ? -1 : 1;
					if (e.ctrlKey) {
						newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveYear(focusDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey) {
						newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir);
						newViewDate = this.moveMonth(focusDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.dates.get(-1) || UTCToday());
						newDate.setUTCDate(newDate.getUTCDate() + dir * 7);
						newViewDate = new Date(focusDate);
						newViewDate.setUTCDate(focusDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)) {
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 32: // spacebar
					// Spacebar is used in manually typing dates in some formats.
					// As such, its behavior should not be hijacked.
					break;
				case 13: // enter
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					this._toggle_multidate(focusDate);
					dateChanged = true;
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')) {
						e.preventDefault();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged) {
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component) {
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
			}
		},

		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker
				.find('>div')
				.hide()
				.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
				.css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options) {
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i) {
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i) {
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function() {
			this.dates = $.map(this.pickers, function(i) {
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function() {
			var range = $.map(this.dates, function(d) {
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p) {
				p.setRange(range);
			});
		},
		dateUpdated: function(e) {
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p) {
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			//临时修复选择后面的日期不会自动修正前面日期的bug
			var j = 0;
			for (j = 0; j < this.pickers.length; j++) {
				this.dates[j] = this.pickers[j].getDate();
			}
			j = i - 1;
			while (j >= 0 && new_date < this.dates[j]) {
				this.pickers[j--].setUTCDate(new_date);
			}

			if (new_date < this.dates[i]) {
				// Date being moved earlier/left
				while (i >= 0 && new_date < this.dates[i]) {
					this.pickers[i--].setUTCDate(new_date);
				}
			} else if (new_date > this.dates[i]) {
				// Date being moved later/right
				while (i < l && new_date > this.dates[i]) {
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function() {
			$.map(this.pickers, function(p) {
				p.remove();
			});
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix) {
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {},
			inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());

		function re_lower(_, a) {
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)) {
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang) {
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]) {
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i, k) {
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function(option) {
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function() {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data) {
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs) {
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				} else {
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option === 'string' && typeof data[option] === 'function') {
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: true,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'yyyy-mm-dd',
		keyboardNavigation: true,
		language: 'zh-CN',
		minViewMode: 0,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		size: '',
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: true,
		weekStart: 0,
		timepicker: false,
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		"en": {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear"
		},
		"zh-CN": {
			days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
			daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
			months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			today: "今日",
			weekStart: 0
		}
	};

	var DPGlobal = {
		modes: [{
			clsName: 'days',
			navFnc: 'Month',
			navStep: 1
		}, {
			clsName: 'months',
			navFnc: 'FullYear',
			navStep: 1
		}, {
			clsName: 'years',
			navFnc: 'FullYear',
			navStep: 10
		}],
		isLeapYear: function(year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format) {
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0) {
				throw new Error("Invalid date format.");
			}
			return {
				separators: separators,
				parts: parts
			};
		},
		parseDate: function(date, format, language) {
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				part, dir, i;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
				date = new Date();
				for (i = 0; i < parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch (part[2]) {
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();
			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d, v) {
						return d.setUTCFullYear(v);
					},
					yy: function(d, v) {
						return d.setUTCFullYear(2000 + v);
					},
					m: function(d, v) {
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate() - 1);
						return d;
					},
					d: function(d, v) {
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length) {
				fparts = $(fparts).filter(function(i, p) {
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part() {
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m === p;
			}
			if (parts.length === fparts.length) {
				var cnt;
				for (i = 0, cnt = fparts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)) {
						switch (part) {
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i = 0; i < setters_order.length; i++) {
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])) {
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language) {
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i = 0, cnt = format.parts.length; i <= cnt; i++) {
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>' +
			'<tr class="date-header">' +
			'<th class="prev"><b></b></th>' +
			'<th colspan="5" class="datepicker-switch"></th>' +
			'<th class="next"><b></b></th>' +
			'</tr>' +
			'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>' +
			'<tr>' +
			'<th colspan="7" class="today"></th>' +
			'</tr>' +
			'<tr>' +
			'<th colspan="7" class="clear"></th>' +
			'</tr>' +
			'</tfoot>',
		timepicerTemplate: '<div class="timepicker-container"></div>'
	};
	DPGlobal.template = '<div class="datepicker">' +
		'<div class="datepicker-days clearfix">' +
		'<table class=" table-condensed">' +
		DPGlobal.headTemplate +
		'<tbody></tbody>' +
		DPGlobal.footTemplate +
		'</table>' +
		DPGlobal.timepicerTemplate +
		'</div>' +
		'<div class="datepicker-months">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'<div class="datepicker-years">' +
		'<table class="table-condensed">' +
		DPGlobal.headTemplate +
		DPGlobal.contTemplate +
		DPGlobal.footTemplate +
		'</table>' +
		'</div>' +
		'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	 * =================== */

	$.fn.datepicker.noConflict = function() {
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	 * ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-toggle="datepicker"]',
		function(e) {
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function() {
		$('[data-toggle="datepicker-inline"]').datepicker();
	});

}(window.jQuery, undefined);
 /*jshint sub:true*/
!function ($) {
  function TimePicker(element, cfg){
    if(!(this instanceof TimePicker)){
      return new TimePicker(element, cfg);
    }

    this.init(element, cfg);
  }

  TimePicker.prototype = {

    _defaultCfg: {
      hour: (new Date()).getHours(),
      minute: (new Date()).getMinutes(),
      orientation: {x: 'auto', y: 'auto'},
      keyboardNavigation: true
    },

    init: function(element, cfg){

      this.element  = $(element)
      this.isInline = false;
      this.isInDatepicker = false;
      this.isInput = this.element.is('input');
      
      this.component = this.element.is('.date') ? this.element.find('.add-on, .input-group-addon, .sui-btn') : false;
      this.hasInput = this.component && this.element.find('input').length;
      if (this.component && this.component.length === 0)
        this.component = false;


      this.picker = $('<div class="timepicker"></div>');


      this.o = this.config = $.extend(this._defaultCfg, cfg);

      this._buildEvents();
      this._attachEvents();

      if(this.isInDatepicker){
        this.picker.addClass('timepicker-in-datepicker').appendTo(this.element);
      }else if (this.isInline){
        this.picker.addClass('timepicker-inline').appendTo(this.element);
        this._show();
      }else{
        this.picker.addClass('timepicker-dropdown dropdown-menu');
      }
    },

    destory: function(){
      this._detachSecondaryEvents();
      this.picker.html('');
      this.picker = null;
    },

    _show: function(){
      if (!this.isInline&&!this.isInDatepicker)
          this.picker.appendTo('body');
      this.picker.show();
      this._place();
      this._render();
      this._attachSecondaryEvents();
    },
    show: function () {
      return this._show();
    },
    _hide: function(){
      if (this.isInline || this.isInDatepicker)
        return;
      if (!this.picker.is(':visible'))
        return;
      this.focusDate = null;
      this.picker.hide().detach();
      this._detachSecondaryEvents();
      this._setValue();
    },

    _keydown: function(e){
      if (this.isInDatepicker) return;
      if (this.picker.is(':not(:visible)')){
        if (e.keyCode === 27) // allow escape to hide and re-show picker
          this._show();
        return;
      }
      var dir,rol;
      switch (e.keyCode){
        case 27: // escape
          this._hide();
          e.preventDefault();
          break;
        case 37: // left
        case 39: // right
          if (!this.o.keyboardNavigation)
            break;//和input 输入有冲突 注释掉
          // dir = e.keyCode === 37 ? 'up' : 'down';
          // rol = 'hour';
          // this._slide(rol,dir);
          break;
        case 38: // up
        case 40: // down
          if (!this.o.keyboardNavigation)
            break;
          // dir = e.keyCode === 38 ? 'up' : 'down';
          // rol = 'minute';
          // this._slide(rol,dir);
          break;
        case 32: // spacebar
          // Spacebar is used in manually typing dates in some formats.
          // As such, its behavior should not be hijacked.
          break;
        case 13: // enter
          this._hide();
          break;
      }
    },

    _place:function(){
      if (this.isInline || this.isInDatepicker)
          return;
      var calendarWidth = this.picker.outerWidth(),
        calendarHeight = this.picker.outerHeight(),
        visualPadding = 10,
        $window = $(window),
        windowWidth = $window.width(),
        windowHeight = $window.height(),
        scrollTop = $window.scrollTop();

        var zIndex = parseInt(this.element.parents().filter(function(){
            return $(this).css('z-index') !== 'auto';
          }).first().css('z-index'))+10;
        var offset = this.component ? this.component.parent().offset() : this.element.offset();
        var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
        var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
        var left = offset.left,
          top = offset.top;

        this.picker.removeClass(
          'datepicker-orient-top datepicker-orient-bottom '+
          'datepicker-orient-right datepicker-orient-left'
        );

        if (this.o.orientation.x !== 'auto'){
          this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
          if (this.o.orientation.x === 'right')
            left -= calendarWidth - width;
        }
        // auto x orientation is best-placement: if it crosses a window
        // edge, fudge it sideways
        else {
          // Default to left
          this.picker.addClass('datepicker-orient-left');
          if (offset.left < 0)
            left -= offset.left - visualPadding;
          else if (offset.left + calendarWidth > windowWidth)
            left = windowWidth - calendarWidth - visualPadding;
        }

        // auto y orientation is best-situation: top or bottom, no fudging,
        // decision based on which shows more of the calendar
        var yorient = this.o.orientation.y,
          top_overflow, bottom_overflow;
        if (yorient === 'auto'){
          top_overflow = -scrollTop + offset.top - calendarHeight;
          bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
          if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
            yorient = 'top';
          else
            yorient = 'bottom';
        }
        this.picker.addClass('datepicker-orient-' + yorient);
        if (yorient === 'top')
          top += height + 6;
        else
          top -= calendarHeight + parseInt(this.picker.css('padding-top')) + 6;

        this.picker.css({
          top: top,
          left: left,
          zIndex: zIndex
        });
    },

    // envent method
    _events: [],
    _secondaryEvents: [],
    _applyEvents: function(evs){
      for (var i=0, el, ch, ev; i < evs.length; i++){
        el = evs[i][0];
        if (evs[i].length === 2){
          ch = undefined;
          ev = evs[i][1];
        }
        else if (evs[i].length === 3){
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.on(ev, ch);
      }
    },
    _unapplyEvents: function(evs){
      for (var i=0, el, ev, ch; i < evs.length; i++){
        el = evs[i][0];
        if (evs[i].length === 2){
          ch = undefined;
          ev = evs[i][1];
        }
        else if (evs[i].length === 3){
          ch = evs[i][1];
          ev = evs[i][2];
        }
        el.off(ev, ch);
      }
    },

    _attachEvents: function(){
      this._detachEvents();
      this._applyEvents(this._events);
    },
    _detachEvents: function(){
      this._unapplyEvents(this._events);
    },
    _attachSecondaryEvents: function(){
      this._detachSecondaryEvents();
      this._applyEvents(this._secondaryEvents);
      this._pickerEvents();
    },
    _detachSecondaryEvents: function(){
      this._unapplyEvents(this._secondaryEvents);
      this.picker.off('click');
    },

    _buildEvents:function(){
      if (this.isInput){ // single input
        this._events = [
          [this.element, {
            focus: $.proxy(this._show, this),
            keyup: $.proxy(function(e){
              if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                this._updateUI();
            }, this),
            keydown: $.proxy(this._keydown, this)
          }]
        ];
      }
      else if (this.component && this.hasInput){ // component: input + button
        this._events = [
          // For components that are not readonly, allow keyboard nav
          [this.element.find('input'), {
            focus: $.proxy(this._show, this),
            keyup: $.proxy(function(e){
              if ($.inArray(e.keyCode, [27,37,39,38,40,32,13,9]) === -1)
                this._updateUI();
            }, this),
            keydown: $.proxy(this._keydown, this)
          }],
          [this.component, {
            click: $.proxy(this._show, this)
          }]
        ];
      }
      else if (this.element.is('div')){  // inline timepicker
        if (this.element.is('.timepicker-container')) {
          this.isInDatepicker = true;
        } else{
          this.isInline = true;
        }
      }
      else {
        this._events = [
          [this.element, {
            click: $.proxy(this._show, this)
          }]
        ];
      }
      this._events.push(
        // Component: listen for blur on element descendants
        [this.element, '*', {
          blur: $.proxy(function(e){
            this._focused_from = e.target;
          }, this)
        }],
        // Input: listen for blur on element
        [this.element, {
          blur: $.proxy(function(e){
            this._focused_from = e.target;
          }, this)
        }]
      );

      this._secondaryEvents = [
        [$(window), {
          resize: $.proxy(this._place, this)
        }],
        [$(document), {
          'mousedown touchstart': $.proxy(function(e){
            // Clicked outside the datepicker, hide it
            if (!(
              this.element.is(e.target) ||
              this.element.find(e.target).length ||
              this.picker.is(e.target) ||
              this.picker.find(e.target).length
            )){
              this._hide();
            }
          }, this)
        }]
      ];
    },

    _pickerEvents: function(){

      var self = this;

      this.picker.on('click', '.J_up', function(ev){

        var target = ev.currentTarget,
          parentNode = $(target).parent(),
          role = parentNode.attr('data-role');

        self._slide(role, 'up');

      }).on( 'click', '.J_down',function(ev){
        var target = ev.currentTarget,
          parentNode = $(target).parent(),
          role = parentNode.attr('data-role');

        self._slide(role, 'down');

      }).on( 'click', 'span',function(ev){

        var target = ev.currentTarget,
          parentNode = $(target).parent().parent().parent(),
          role = parentNode.attr('data-role'),
          targetNum = target.innerHTML,
          attrs = self[role + 'Attr'],
          step = parseInt(targetNum - attrs.current,10),
          dur;
        if(step > 0){
          self._slideDonw(attrs, step);
        }else{
          self._slideUp(attrs, -step);
        }

      });
    },

    _slide: function(role, direction){

      var attrs = this[role+ 'Attr'];

      if(direction == 'up'){
        this._slideUp(attrs);	
      }else if(direction == 'down'){
        this._slideDonw(attrs);
      }
    },

    _slideDonw: function(attrs, step, notSetValue){

      step = step || 1;
      var cp = attrs.cp,
        dur = attrs.ih*step;

      attrs.current += step;

      if(attrs.current > attrs.maxSize){
        attrs.current = 0;
        dur = -attrs.ih * attrs.maxSize;
      }

      attrs.cp -= dur;
      this._animate(attrs.innerPickerCon, attrs.cp);

      $('.current', attrs.innerPickerCon).removeClass('current');
      $('span[data-num="' + attrs.current + '"]', attrs.innerPickerCon).addClass('current');
      if (!notSetValue) {
        this._setValue();
      }
    },

    _slideUp: function(attrs, step ,notSetValue){

      step = step || 1;

      var cp = attrs.cp,
        dur = attrs.ih*step;

      attrs.current -= step;

      if(attrs.current < 0){
        attrs.current = attrs.maxSize;
        dur = -attrs.ih * attrs.maxSize;
      }

      attrs.cp += dur;
      this._animate(attrs.innerPickerCon, attrs.cp);
      $('.current', attrs.innerPickerCon).removeClass('current');
      $('span[data-num="' + attrs.current + '"]', attrs.innerPickerCon).addClass('current');
      if (!notSetValue) {
        this._setValue();
      }
    },
    _updateSlide:function(attrs,step){
      var notSetValue = true;
      if(step&&(step > 0)){
        this._slideDonw(attrs, step, notSetValue);
      }else if(step){
        this._slideUp(attrs, -step, notSetValue);
      }
    },
    _updateUI: function(){
      var oldMimute = this.o.minute,
          oldHour = this.o.hour,
          attrs,role,step;
      
      this._getInputTime();
      

      if (oldMimute !== this.o.minute) {
        attrs = this['minuteAttr'];
        step = parseInt(this.o.minute - attrs.current,10);
        this._updateSlide(attrs,step);
      }
      if (oldHour !== this.o.hour) {
        attrs = this['hourAttr'];
        step = parseInt(this.o.hour - attrs.current,10);
        this._updateSlide(attrs,step);
      }
    },

    //将时间设置在input 或者 data-api里
    _doSetValue:function(timeStr,notSetValue){
      var element;
      if (this.isInput){
        element = this.element;
      }
      else if (this.component){
        element = this.element.find('input');
      }
      if (element){
        element.change();
        element.val(timeStr);
      }else if(this.isInDatepicker){
        this.element.data("time",timeStr);
        if (!notSetValue) {
          this.element.trigger('time:change');
        }
      }
    },
    _render: function(){
      this.picker.html('');
      this._getInputTime();
      this._renderHour();
      this._renderMinutes();
      this._renderSplit();
      //form input
      this._setValue();
    },
    _foramtTimeString:function(val){
      var time = {
        minute:0,
        hour:0
      },minute,hour;
      val = val.split(':');
      for (var i = val.length - 1; i >= 0; i--) {
        val[i] = $.trim(val[i]);
      }
      if (val.length === 2) {
        minute = parseInt(val[1],10);
        if (minute >= 0 && minute < 60) {
          time.minute = minute;
        }
        hour = parseInt(val[0],10);
        if (hour >= 0 && hour < 24) {
          time.hour = hour;
        }
      }
      return time;
    },
    _getInputTime: function(){
      if (this.isInline&&this.isInDatepicker) return;
      var element,minute,hour,val,time;
      if (this.isInput||this.isInDatepicker){
        element = this.element;
      }
      else if (this.component){
        element = this.element.find('input');
      }
      if (element){
        if(this.isInDatepicker){
          val = $.trim(element.data('time'));
        }else{
          val = $.trim(element.val());
        }
        time = this._foramtTimeString(val)
        this.o.minute = time.minute;
        this.o.hour = time.hour;
      }
    },

    _juicer: function(current,list){
      var items = '',item;
      for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] == current) {
          item = '<span ' + 'class="current" data-num="' + i + '">' + list[i] + '</span>';
        } else{
          item = '<span ' + 'data-num="' + i + '">' + list[i] + '</span>';
        }
        items = item + items;
      }
      return '<div class="picker-wrap">' +
            '<a href="javascript:;" class="picker-btn up J_up"><b class="arrow"></b><b class="arrow-bg"></b></a>' +
              '<div class="picker-con">'+
                '<div class="picker-innercon">'+
                  items +
                '</div>' +
              '</div>' +
              '<a href="javascript:;" class="picker-btn down J_down"><b class="arrow"></b><b class="arrow-bg"></b></a>' +
            '</div>';
    },

    _renderHour: function(){
      var self = this,
        hourRet = [];

      for(var i = 0; i < 24; i++){
        hourRet.push(self._beautifyNum(i));
      }

      var tpl = this._juicer(self.o.hour,hourRet),
        $tpl = $(tpl);

      $tpl.attr('data-role', 'hour');

      this.picker.append($tpl);

      this.hourAttr = this._addPrefixAndSuffix($tpl, 23);
      this.hourAttr.current = this.o.hour;
      this.hourAttr.maxSize = 23;
    },

    _renderMinutes: function(){
      var self = this,
        minuteRet = [];
      for(var i = 0; i < 60; i++){
        minuteRet.push(self._beautifyNum(i));
      }

      var tpl = this._juicer(self.o.minute, minuteRet),
        $tpl = $(tpl);

      $tpl.attr('data-role', 'minute');

      this.picker.append($tpl);

      this.minuteAttr = this._addPrefixAndSuffix($tpl, 59);
      this.minuteAttr.current = this.o.minute;
      this.minuteAttr.maxSize = 59;
    },

    _addPrefixAndSuffix: function(parentNode, maxSize){

      var self = this,
        pickerCon = $('.picker-con', parentNode),
        innerPickerCon = $('.picker-innercon', parentNode),
        currentNode = $('.current', parentNode),
        itemH = currentNode.outerHeight(),
        parentH = pickerCon.outerHeight(),
        fixNum = Math.floor(parentH/itemH) + 1,
        currentNodeOffsetTop,
        currentPosition,
        tpl = '';

      for(var j = maxSize - fixNum; j <= maxSize; j++){
        tpl += '<span>' + self._beautifyNum(j) + '</span>';
      }

      innerPickerCon.prepend($(tpl));

      tpl = '';

      for(var i = 0; i < fixNum; i ++){
        tpl += '<span>' + self._beautifyNum(i) + '</span>';
      }

      innerPickerCon.append($(tpl));

      currentNodeOffsetTop = currentNode.offset().top - pickerCon.offset().top;
      currentPosition =  -currentNodeOffsetTop + itemH * 2;
      this._animate(innerPickerCon, currentPosition);

      return {
        ph: parentH,
        cp: currentPosition,
        ih: itemH,
        innerPickerCon: innerPickerCon,
        scrollNum: fixNum - 1
      };
    },

    _renderSplit: function(){
      var tpl = '<div class="timePicker-split">' +
              '<div class="hour-input"></div>' +
              '<div class="split-icon">:</div>' +
              '<div class="minute-input"></div>' +
            '</div>';

      this.picker.append($(tpl));
    },
    _getCurrentTimeStr: function(){
      var  text, minute, hour;
      hour = this.hourAttr.current;
      minute =  this.minuteAttr.current;
      text = this._beautifyNum(hour)+':'+ this._beautifyNum(minute);
      return text;
    },
    _setValue: function(){
      if (this.isInline) return;
      this._doSetValue(this._getCurrentTimeStr()); //将时间装填在 input 或者 data api 里
    },

    _animate: function(node, dur){

      if ($.support.transition) {
        node.css({
          'top': dur + 'px',
        });
      }else{
        node.animate({
          top: dur + 'px',
        },300);
      }
      
    },

    _beautifyNum: function(num){
      num = num.toString();
      if(parseInt(num) < 10){
        return '0' + num;
      }

      return num;
    },
    //通过参数来更新日期
    //timeStr(string): 12:20
    //notSetValue(string): false/true , 是否需要将数值设置在input中. true 的时候只能设置在data-api中,这个参数只用在datepicker中
    update: function(timeStr,notSetValue){
      this._doSetValue(timeStr,notSetValue);
      this._updateUI();
    },

    getTime: function(){
      return this._getCurrentTimeStr();
    }
  }

  /* DROPDOWN PLUGIN DEFINITION
     * ========================== */
  //maincode end
  var old = $.fn.timepicker;
  $.fn.timepicker = function(option){
    var args = Array.apply(null, arguments);
      args.shift();
      var internal_return;
    this.each(function(){
      var $this = $(this)
          , data = $this.data('timepicker')
      if (!data) $this.data('timepicker', (data = new TimePicker(this,option)))
      if (typeof option === 'string' && typeof data[option] === 'function'){
        internal_return = data[option].apply(data, args);
        if (internal_return !== undefined)
          return false;
      }
    });
    if (internal_return !== undefined)
      return internal_return;
    else
      return this;
  }
  /* TIMEPICKER NO CONFLICT
    * =================== */

  $.fn.timepicker.noConflict = function(){
    $.fn.timepicker = old;
    return this;
  };


  /* TIMEPICKER DATA-API
  * ================== */

  $(document).on(
    'focus.timepicker.data-api click.timepicker.data-api',
    '[data-toggle="timepicker"]',
    function(e){
      var $this = $(this);
      if ($this.data('timepicker'))
        return;
      e.preventDefault();
      // component click requires us to explicitly show it
      $this.timepicker('_show');
    }
  );
  $(function(){
    $('[data-toggle="timepicker-inline"]').timepicker();
  });
}(window.jQuery)
