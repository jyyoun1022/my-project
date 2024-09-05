const options02 = {
  processing: true,
  serverSide: true,
  ajax: {
    url:  'https://dev-aistudio.com/apis/v1/dataTable/selectDataTable',
    type: "POST",
    data: function(data, settings) {
      const pageIndex = (data.start / data.length) + 1;
      data.pageIndex = pageIndex;
      data.pageSize = data.length;
    },
    dataFilter: function(data){
      let json = jQuery.parseJSON( data );
      json.recordsTotal = json.paging.totalCount;
      json.recordsFiltered = json.paging.totalCount;
      json.data = json.data;

      return JSON.stringify( json ); // return JSON string
    }
  },
  order: [[ 1, "desc" ]],
  pageLength: 5,
  lengthChange: false, // pagingLength selectBox 가리기
  columns: [
    {
      data: null,
      width: "5%",
      className: 'text-center',
      render: function (data, type, row, meta) {
        let rowIndex = meta.row + 1;
        let id = `cb${rowIndex.toString().padStart(2, '0')}`;
        let d = '';
        if (data.office === "ind") d = `disabled`;
        return `
        <span class="checkbox">
          <input type="checkbox" id="${id}" class="checkbox-input" ${d}>
          <label for="${id}" class="checkbox-label"></label>
        </span>`;
      }
    },
    {
      header : "header1",
      data: 'id',
      width: "5%",
      className: 'text-center',
    },
    {
      header : "header1",
      data: 'name',
    },
    {
      header : "header2",
      data: 'position',
    },
    {
      header : "header3",
      data: 'office',
      width: "10%",
      className: "text-center",
      render: function (data, type, row, meta) {
        let countryName;
        switch (data) {
          case "vnm":

            countryName = "베트남";

            break;

          case "ind":

            countryName = "인도";

            break;

          case "bra":

            countryName = "브라질";

            break;

          default:

            countryName = "대한민국";

            break;

        }



        return `

        <span class="national-flag" title="${countryName}">

            <img src="../images/icon_${data}.png" alt="${countryName}">

        </span>`;

      }

    },

    {

      header : "header4",

      data: 'salary',

      render: function (data, type, row, meta) {

        let h = '';



        if (data.replace(/[\$,]/g, '') * 1 > 200000) h = 'highlight';



        return `<a href="#" class="link ${h}">$${_ai.format.numberFormat(data)}</a>`;

      }

    }

  ],

  columnDefs: [

    {

      targets: [0,2,3,4],

      orderable: false,

    }

  ],

  responsive : true,

  layout: {

    topEnd: {

      search: {

          placeholder: 'placeholder'

      }

    },

    topStart: {

      info: {

        callback: function (s, start, end, max, total, result) {

          let api = this.api();

          let totalCnt = api.ajax.json().paging.totalCount;



          let countBox = document.createElement('div');

          countBox.classList.add('in-flex');



          countBox.innerHTML = `

            <span class="total-cnt">전체 <span class="point">${totalCnt}</span></span>

            <span class="total-cnt">선택 <span id="selectCount" class="point"></span></span>`;



          return countBox;

        }

      }

    },

    bottomStart: {

      info: {

        text: '페이지 _PAGE_ of _PAGES_'

      }

    },

    paging: true

  },

}



const myTable02 = new DataTable('#example02', options02);