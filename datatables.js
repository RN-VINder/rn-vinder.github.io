$(document).ready(function () {
    var table = $('#table').DataTable({
      	// hide loading spinner
        initComplete: function(settings) { showTable(); },
  			language: {url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/de-DE.json'},
        ajax: {
            url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2IqZXswF4hLOmVsRUov5O8Fz-4KjSCqs3KRHw4EKLowog0U0vYjl3rHvN6ajVdiXFokqdlTesgJZD/pub?gid=0&single=true&output=csv",
            //url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2IqZXswF4hLOmVsRUov5O8Fz-4KjSCqs3KRHw4EKLowog0U0vYjl3rHvN6ajVdiXFokqdlTesgJZD/pub?gid=2142951533&single=true&output=csv',
      			dataType: 'text',
      			dataSrc: function (csvdata) {
          		var data = csvdata.split(/\r?\n|\r/); 
              return $.csv.toObjects(csvdata);
            }
          },//end ajax load
      	processing: true,
        scrollY: 400,
        deferRender: true,
        scroller: {
        		displayBuffer: 5
   				},
        columns: [
            {
                data: "",
                defaultContent: "",
                searchable: false,
                orderable: false,
                className: 'truncate dtr-control dt-body-left',
            },
            { data: 'Zeitstempel', searchable: false },
            { data: 'TTF Username', className: 'truncate dt-body-left'},
            { data: 'Bestelldatum', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'Bestellnummer', className:'truncate dt-body-left' }, 
            { data: 'Bestellung geschoben?' },
            { data: 'Außenfarbe (Lack)', className:'truncate-mini dt-body-left' },
            { data: 'Innenraum', className:'truncate-mini dt-body-left' },
            { data: 'Model' },
            { data: 'Variante' },
            { data: 'Felgen', className: 'truncate dt-body-left'},
            { data: 'Autopilot' },
            { data: 'Anhängerkupplung' },
            { data: 'Winterreifen' },
            { data: 'Lieferstatus' },
            { data: 'Liefermonat' },
            { data: 'Lieferzeitraum START', type: 'date-eu', className:'truncate' },
            { data: 'Lieferzeitraum ENDE', type: 'date-eu', className:'truncate' },
            { data: 'Auslieferungsland' },
            { data: 'ALZ - Deutschland', className:'truncate' },
            { data: 'ALZ - Österreich' },
            { data: 'ALZ - Schweiz' },
            { data: 'ALZ - Sonstiges' },
            { data: 'VIN-Zuteilung', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'VIN', className: 'truncate-mini dt-body-left'},
            { data: 'Herstellungsdatum', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'Übergabedatum (geplant)', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'Übergabedatum (tatsächlich)', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'Zulassung', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'BAFA Antrag', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'BAFA Bewilligung', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'BAFA Auszahlung', type: 'date-eu', className:'truncate dt-body-left' },
            { data: 'Kommentare / Zusatzinformationen' },
      		],
			columnDefs: [
						{ "defaultContent": "", "targets": "_all" },
            { responsivePriority: 1, targets: [0,2,3,4,6,7,10,16,17,19,23,24] },
            { responsivePriority: 2, targets: [25, 26, 27, 29, 30, 31, 32] },
						{ responsivePriority: 10001, targets: [28, 5, 8, 9, 1, 11, 12, 13, 14, 15, 18, 20, 21, 22] },
     //truncate long inputs
        { targets: 2, render: $.fn.dataTable.render.ellipsis(10) }, //username
        { targets: [0, 4, 7], render: $.fn.dataTable.render.ellipsis(6) }, //color
        { targets: [3, 16, 17, 23, 25, 26, 27, 29, 30, 31, 32], render: $.fn.dataTable.render.ellipsis(10) }, //dates

          ],
      responsive: {
            details: {
                renderer: function(api, rowIdx, columns){
                    let render_method = $.fn.dataTable.Responsive.renderer.tableAll( {tableClass: ''})
                    return render_method(api, rowIdx, columns.filter(column => column.hidden && column.data))
                  }
              }
  			},
      searchPanes: {
						controls: false,
						columns: [19,8,9,6,7,10],
            	panes: [
                {
                    header: 'VIN zugeteilt?',
                    options: [
                                                {
                            label: 'Hat eine VIN-Zuteilung bzw. Abschlussrechnung',
                            value: function(rowData, rowIdx) {
                                return rowData['VIN'] !== '' || rowData['VIN-Zuteilung'] !== '';
                            }
                        },
                        {
                            label: 'Hat bisher keine VIN-Zuteilung bzw. Abschlussrechnung',
                            value: function(rowData, rowIdx) {
                                return rowData['VIN'] === '' && rowData['VIN-Zuteilung'] === '';
                                    }
                                }

                            ],

                        }
                    ],
            cascadePanes: false,
                    dtOpts: {select: {style: 'multi'} }
					},
    	dom: 'PQlfrtip',
    	order: [[3, 'asc']],
    
   // End Datatables 
   });
    
//add posiition numbers
    table.on('order.dt search.dt', function () {
        let i = 1;
 
        table.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();
   
     
})


// Hide loadingspinner and show table
function showTable() {
  document.getElementById("overlayLoading").style.display = "none";
  document.getElementById("container").style.display = "block";
}


function testFunction() {
var table = $('#table').DataTable();


alert( 'column visibility are set to: '+table.columns().responsiveHidden().join(', ') );

table.columns( [0,1] ).visible( true );
table.columns.adjust().draw( false )

alert( 'column visibility are set to: '+table.columns().responsiveHidden().join(', ') );
}

 
