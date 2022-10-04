$(document).ready(function () {
    var table = $('#table').DataTable({
  			language: {url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/de-DE.json'},
        ajax: {
            url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2IqZXswF4hLOmVsRUov5O8Fz-4KjSCqs3KRHw4EKLowog0U0vYjl3rHvN6ajVdiXFokqdlTesgJZD/pub?gid=0&single=true&output=csv",
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
                className: 'dtr-control',
            },
            { data: 'Zeitstempel', searchable: false},
            { data: 'TTF Username', width: '10px', className: 'ui table'},
            { data: 'Bestelldatum', type: 'date-eu' },
            { data: 'Bestellnummer' },
            { data: 'Bestellung geschoben?' },
            { data: 'Außenfarbe (Lack)', className:'truncate' },
            { data: 'Innenraum', className:'truncate' },
            { data: 'Model' },
            { data: 'Variante' },
            { data: 'Felgen', className:'truncate' },
            { data: 'Autopilot' },
            { data: 'Anhängerkupplung' },
            { data: 'Winterreifen' },
            { data: 'Lieferstatus' },
            { data: 'Liefermonat' },
            { data: 'Lieferzeitraum START' },
            { data: 'Lieferzeitraum ENDE' },
            { data: 'Auslieferungsland' },
            { data: 'ALZ - Deutschland', className:'truncate' },
            { data: 'ALZ - Österreich' },
            { data: 'ALZ - Schweiz' },
            { data: 'ALZ - Sonstiges' },
            { data: 'VIN-Zuteilung' },
            { data: 'VIN' },
            { data: 'Herstellungsdatum', type: 'date-eu' },
            { data: 'Übergabedatum (geplant)', type: 'date-eu' },
            { data: 'Übergabedatum (tatsächlich)', type: 'date-eu' },
            { data: 'Zulassung', type: 'date-eu' },
            { data: 'BAFA Antrag', type: 'date-eu' },
            { data: 'BAFA Bewilligung', type: 'date-eu' },
            { data: 'BAFA Auszahlung', type: 'date-eu' },
            { data: 'Kommentare / Zusatzinformationen' },
      		],
			columnDefs: [
						{ "defaultContent": "", "targets": "_all" },
            { responsivePriority: 1, targets: [0,2,3,4,6,7,10,16,17,19,23,24] },
						{ responsivePriority: 10001, targets: [1, 5, 8, 9, 11, 12, 13, 14, 15, 18, 20, 21, 22, 25, 26, 27, 28, 29, 30, 31, 32] },
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
