import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.createPieCharts();
  }

  
  sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }

  addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    let newoffset = offset - 1;
    let sizeRotation = -179 + sliceSize;

    $(id + " ." + sliceID).css({
      "transform": "rotate(" + newoffset + "deg) translate3d(0,0,0)"
    });

    $(id + " ." + sliceID + " span").css({
      "transform": "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
      "background-color": color
    });
  }

  iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    let
      maxSize = 179,
      sliceID = "s" + dataCount + "-" + sliceCount;

    if (sliceSize <= maxSize) {
      this.addSlice(id, sliceSize, pieElement, offset, sliceID, color);
    } else {
      this.addSlice(id, maxSize, pieElement, offset, sliceID, color);
      this.iterateSlices(id, sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
  }

  createPie(id) {
    let
      listData = [],
      listTotal = 0,
      offset = 0,
      i = 0,
      pieElement = id + " .pie-chart__pie",
      dataElement = id + " .pie-chart__legend"

    let color = [
      "cornflowerblue",
      "olivedrab",
      "orange",
      "tomato",
      "crimson",
      "purple",
      "turquoise",
      "forestgreen",
      "navy"
    ];

    color = this.shuffle(color);

    $(dataElement + " span").each(function () {
      listData.push(Number($(this).html()));
    });

    for (i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }

    for (i = 0; i < listData.length; i++) {
      let size = this.sliceSize(listData[i], listTotal);
      this.iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
      offset += size;
    }
  }

  shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }

    return a;
  }

  createPieCharts() {
    this.createPie('.pieID--micro-skills');
    this.createPie('.pieID--categories');
    this.createPie('.pieID--operations');
  }
}
