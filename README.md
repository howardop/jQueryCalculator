# jQueryCalculator

This is a simple calculator written with jQuery. In addition to doing arithmetic, it has several other features of real calculators:

1.  Hitting the = key will repeat the previous operation, e.g., After entering 5, +, 3, =, the display will show 15. After hitting = again, the display will show 18 (15+3)

2.  If the user enters 1 or more digits and then hits = before first selecting an operator and entering another number, the = button is ignored and the display remains the same. E.g., if the user enters 1, 2, =, the display will show 12

3.  Similarly, if the user enters a number and then an operator and then hits = before entering another number, the = sign is also ignored, the previous operator is remembered and the user can continue the calculation. For example, if the user enters 5, +, 3, , =, 4, the equal sign is ignored and the calculator display will show 32 (5+34).

4.  If the user enters a number and then an operator and then a different operator, the first operator is ignored. E.g., if the user enters 5, +, , 3, =, the display will show 15 (53)

5.  There is an area under the calculator for printing messages to aid debugging. Add to the area by using $('#history').append();
