/**
 * jQuery Mortar Plugin v1.0
 *
 *
 * Copyright (c) 2012 Jamie Weber
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
  $.fn.mortar = function (options) {
    var defaults = {
      layout: "hanging",
      columnWidth:
        typeof options === "undefined"
          ? this.children(":first-child").outerWidth()
          : options.margins
          ? this.children(":first-child").outerWidth(true)
          : this.children(":first-child").outerWidth(),
      margins: false,
      mortarWidth: 20,
      mortarHeight: 10,
    };

    var options = $.extend(defaults, options);
    // Get the container's inner height, children, and number of children
    var containerHeight = this.innerHeight(),
      containerWidth = 0,
      firstKidHeight = !options.margins
        ? this.children(":first-child").outerHeight()
        : this.children(":first-child").outerHeight(true),
      containerKids = this.children(), // The elements in the container
      numKids = containerKids.length, // Number of elements in the container
      contentHeight = 0, // The accumulative height in the column
      numColumn = 1, // The number of columns
      itemIdx = 0; // The index of the element in the column

    this.css({ position: "relative" }); // Set container's position to relative
    containerKids.css({ position: "absolute" }); // Set all child element' s position to absolute

    // If the container is shorter than the first child element's height display everthing inline
    if (firstKidHeight > containerHeight) {
      containerKids.each(function (i) {
        var $this = $(this),
          $thisWidth = !options.margins
            ? $this.outerWidth()
            : $this.outerWidth(true),
          leftPos =
            i === 0
              ? 0
              : $thisWidth * (i + 1) - $thisWidth + options.mortarWidth * i;

        $this.css({ top: "0px" });

        if (i === 0) {
          $this.css({ left: leftPos + "px" });
        } else if (i > 0) {
          $this.css({ left: leftPos + "px" });
        }
      });
    } else {
      // Start placing the children of the container horizontally
      containerKids.each(function (i) {
        var $this = $(this),
          $thisHeight = !options.margins
            ? $this.outerHeight()
            : $this.outerHeight(),
          $thisWidth = !options.margins
            ? $this.outerWidth()
            : $this.outerWidth(),
          leftPos,
          topPos;

        if (i === 0) {
          itemIdx = 0;
          contentHeight = $thisHeight;

          if (options.layout === "hanging") {
            $this.css({ top: "0px", left: "0px" });
          } else {
            $this.css({ bottom: "0px", left: "0px" });
          }
        } else {
          contentHeight += $thisHeight + options.mortarHeight * itemIdx;
          itemIdx++;

          if (contentHeight > containerHeight) {
            numColumn++; // Keep track of what column we're on
            contentHeight = $thisHeight; // Reset the contentHeight if we need a new column
            topPos = 0; // Reset the top positioning
            itemIdx = 0; // The item number in the column
          }

          topPos =
            topPos === 0
              ? 0
              : contentHeight - $thisHeight + options.mortarHeight; // Calculate the top postions
          leftPos =
            numColumn === 1
              ? 0
              : options.columnWidth * (numColumn - 1) +
                options.mortarWidth * (numColumn - 1); // Calculate the left postions

          if (numColumn === 1) {
            if (options.layout === "hanging") {
              $this.css({ left: leftPos + "px", top: topPos + "px" });
            } else {
              $this.css({ left: leftPos + "px", bottom: topPos + "px" });
            }
          } else {
            if (options.layout === "hanging") {
              $this.css({ left: leftPos + "px", top: topPos + "px" });
            } else {
              $this.css({ left: leftPos + "px", bottom: topPos + "px" });
            }
          }
        }
      });

      containerWidth = numColumn * options.columnWidth;
      this.css({ width: containerWidth });
    }
  };
})(jQuery);
