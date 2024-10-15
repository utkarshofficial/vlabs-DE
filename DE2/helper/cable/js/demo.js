(function () {
  var yy = document.getElementById("check");
  yy.onclick = checkk;

  // ! check
  function checkk() {
    if (connections.length == 0) {
      alert("Please make the connections first");
      return false;
    }

    if (connections.length < 6) {
      alert("Wrong Connections\nPlease go through the instructions once");
      return false;
    }
    let isConnectionRight = false
    if (connections.length >= 6) {
      let matrixForCheckGraph = [
      // 0 1 2 3 4 5 6 7 8 9 10
        [0,0,0,0,0,0,0,0,0,0,0], // 0
        [0,0,0,1,0,0,0,0,0,0,0], // 1
        [0,0,0,0,0,0,1,0,1,0,0], // 2
        [0,1,0,0,0,0,0,0,0,0,0], // 3
        [0,0,0,0,0,0,0,1,0,1,0], // 4
        [0,0,0,0,0,0,0,0,0,0,1], // 5
        [0,0,1,0,0,0,0,0,1,0,0], // 6
        [0,0,0,0,1,0,0,0,0,1,0], // 7
        [0,0,1,0,0,0,1,0,0,0,0], // 8
        [0,0,0,0,1,0,0,1,0,0,0], // 9
        [0,0,0,0,0,1,0,0,0,0,0], // 10
      ]
      var listDiv = [];
      for (var j = 0; j < connections.length; j++) {
        let pos = [connections[j].targetId,connections[j].sourceId] 
        listDiv.push(pos)
      }
      for(let i=0;i<listDiv.length;i++){
        // substr is so i can extract the number from the id
        let vertex1 = parseInt(listDiv[i][0].substr(-1))
        let vertex2 = parseInt(listDiv[i][1].substr(-1))

        if(vertex1 == 0){
          vertex1 = 10
        }else if(vertex2 == 0){
          vertex2 = 10
        }

        console.log(vertex1,vertex2,matrixForCheckGraph[vertex1][vertex2],listDiv)

        if(matrixForCheckGraph[vertex1][vertex2]==1){
          isConnectionRight = true
        }
        else{
          isConnectionRight = false
          // todo for connection wrong
          alert("wrong")
          return false
        }
      }
      // todo: for right connection note
      alert("right")
    }
    
  }

  (showConnectionInfo = function (listDiv) {
    console.log(listDiv);
  }),
    (hideConnectionInfo = function (listDiv) {
      listDiv.style.display = "none";
    }),
    (connections = []),
    (updateConnections = function (conn, remove) {
      if (!remove) connections.push(conn);
      else {
        var idx = -1;
        for (var i = 0; i < connections.length; i++) {
          if (connections[i] == conn) {
            idx = i;
            break;
          }
        }
        if (idx != -1) connections.splice(idx, 1);
      }
      if (connections.length > 0) {
        var listDiv = [];
        for (var j = 0; j < connections.length; j++) {
          let pos = [connections[j].targetId,connections[j].sourceId] 
          listDiv.push(pos)
        }
        showConnectionInfo(listDiv);
      }
    });

  jsPlumb.ready(function () {
    var instance = jsPlumb.getInstance();

    // suspend drawing and initialise.
    instance.batch(function () {
      // bind to connection/connectionDetached events, and update the list of connections on screen.
      instance.bind("connection", function (info, originalEvent) {
        updateConnections(info.connection);
      });
      instance.bind("connectionDetached", function (info, originalEvent) {
        updateConnections(info.connection, true);
      });

      instance.bind("connectionMoved", function (info, originalEvent) {
        //  only remove here, because a 'connection' event is also fired.
        // in a future release of jsplumb this extra connection event will not
        // be fired.
        updateConnections(info.connection, true);
      });

      // configure some drop options for use by all endpoints.
      var exampleDropOptions = {
        tolerance: "touch",
        hoverClass: "dropHover",
        activeClass: "dragActive",
      };
      let radius = 14
      var exampleEndpoint1 = {
        endpoint: ["Dot", { radius: radius }],
        paintStyle: { fill: "pink" },
        isSource: true,
        scope: "green",
        connectorStyle: { stroke: "pink", strokeWidth: 6 },
        connector: ["Bezier", { curviness: 10 }],
        maxConnections: 1,
        isTarget: true,
        dropOptions: exampleDropOptions,
      };
      var exampleEndpoint2 = {
        endpoint: ["Dot", { radius: radius }],
        paintStyle: { fill: "black" },
        isSource: true,
        scope: "green",
        connectorStyle: { stroke: "black", strokeWidth: 6 },
        connector: ["Bezier", { curviness: -50 }],
        maxConnections: 3,
        isTarget: true,
        dropOptions: exampleDropOptions,
      };
      var exampleEndpoint3 = {
        endpoint: ["Dot", { radius: radius }],
        paintStyle: { fill: "red" },
        isSource: true,
        scope: "green",
        connectorStyle: { stroke: "red", strokeWidth: 6 },
        connector: ["Bezier", { curviness: -30 }],
        maxConnections: 3,
        isTarget: true,
        dropOptions: exampleDropOptions,
      };
      var exampleEndpoint4 = {
        endpoint: ["Dot", { radius: radius }],
        paintStyle: { fill: "green" },
        isSource: true,
        scope: "green",
        connectorStyle: { stroke: "green", strokeWidth: 6 },
        connector: ["Bezier", { curviness: -50 }],
        maxConnections: 1,
        isTarget: true,
        dropOptions: exampleDropOptions,
      };
      // conn 1
      instance.addEndpoint(
        "dragDropWindow1",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint1
      );
      instance.addEndpoint(
        "dragDropWindow3",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint1
      );

      // conn 2
      instance.addEndpoint(
        "dragDropWindow4",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint2
      );
      instance.addEndpoint(
        "dragDropWindow7",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint2
      );
      instance.addEndpoint(
        "dragDropWindow9",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint2
      );

      // conn 3
      instance.addEndpoint(
        "dragDropWindow8",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint3
      );
      instance.addEndpoint(
        "dragDropWindow6",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint3
      );
      instance.addEndpoint(
        "dragDropWindow2",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint3
      );

      // conn 4
      instance.addEndpoint(
        "dragDropWindow10",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint4
      );
      instance.addEndpoint(
        "dragDropWindow5",
        { anchor: [0.75, 0, 0, -1] },
        exampleEndpoint4
      );
      /*instance.addEndpoint("dragDropWindow9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
			instance.addEndpoint("dragDropWindow10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
			instance.addEndpoint("dragDropWindow11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
			instance.addEndpoint("dragDropWindow12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

      instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

      var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
      instance.on(hideLinks, "click", function (e) {
        instance.toggleVisible(this.getAttribute("rel"));
        jsPlumbUtil.consume(e);
      });

      var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
      instance.on(dragLinks, "click", function (e) {
        var s = instance.toggleDraggable(this.getAttribute("rel"));
        this.innerHTML = s ? "disable dragging" : "enable dragging";
        jsPlumbUtil.consume(e);
      });

      var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
      instance.on(detachLinks, "click", function (e) {
        instance.deleteConnectionsForElement(this.getAttribute("rel"));
        jsPlumbUtil.consume(e);
      });

      // ! reset
      instance.on(document.getElementById("reset"), "click", function (e) {
        // instance.detachEveryConnection();
        instance.deleteEveryConnection()
        showConnectionInfo("");
        jsPlumbUtil.consume(e);
      });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);
  });

})();
