diagram = (function(){
	var $ = go.GraphObject.make;
	var diagram;
	var initDiagram = function () {
		diagram = $(go.Diagram, 
			'myDiagramDiv', {
				initialContentAlignment: go.Spot.Center
		});

		var forelayer = diagram.findLayer("Foreground");
		diagram.addLayerBefore($(go.Layer, { name: "AC" }), forelayer);
		diagram.addLayerBefore($(go.Layer, { name: "bulb" }), forelayer);

          diagram.add(
               $(go.Node, "Auto",
                 $(go.Shape, "RoundedRectangle", { fill: "lightblue" }),
                 $(go.TextBlock, "Hello!", { margin: 5 })
               ));

		diagram.model = $(go.GraphLinksModel, {
			nodeDataArray: [
				{key: 1, category: 'bulb', color: "yellow"},
				{key: 2, category: 'bulb', color: "yellow"},
				{key: 3, category: 'bulb', color: "yellow"},
				{key: 4, category: 'bulb', color: "yellow"},
				{key: 5, category: 'AC', color: "cyan"},
				{key: 6, category: 'AC', color: "cyan"},
				{key: 7, category: 'AC', color: "cyan"}
			],
			// linkDataArray: [
			// 	{from: 1, to: 2},
			// 	{from: 2, to: 3},
			// 	{from: 1, to: 3},
			// 	{from: 3, to: 4}
			// ]
		});


		diagram.nodeTemplate = $(go.Node, 'Auto', new go.Binding("layerName", "category"),
							$(go.Shape, 'Circle', new go.Binding("fill", "color")),
							$(go.TextBlock, new go.Binding("text", "category")),
							{
								selectionChanged: function(p) {
								  p.layerName = (p.isSelected ? "Foreground" : p.data.category);
								},
								layerChanged: function(p, oldLayer, newLayer) {
								  if (newLayer !== null) p.elt(1).text = newLayer.name;
								}
							}
							);

		diagram.undoManager.isEnabled = true;

		// define this function so that the checkbox event handlers can call it
		toggleVisible = function(layername, e) {
			diagram.commit(function(d) {
				var layer = d.findLayer(layername);
				if (layer !== null) layer.visible = e.currentTarget.checked;
			}, 'toggle ' + layername);
		};

	}
	return { initDiagram };
})();