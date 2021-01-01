import React, { useEffect } from "react";
import Quagga from "@ericblade/quagga2";

const Scanner = ({onDetected}: any) => {

  useEffect(() => {
		Quagga.init({
			inputStream : {
				name : "Live",
				type : "LiveStream",
				constraints: {
					width: { min: 850 },
					height: { min: 500 },
					facingMode: "environment",
					aspectRatio: { min: 1, max: 2 }
				},
				target: document.querySelector('#interactive')    // Or '#yourElement' (optional)
			},
			frequency: 10,
			locator: {
				patchSize: "medium",
				halfSample: true
			},
			decoder : {
				readers : ["ean_reader"]
			},
			locate: true

		}, function(err) {
				if (err) {
						console.log(err);
						return;
				}
				console.log("Initialization finished. Ready to start");
				Quagga.start();
		});

		Quagga.onDetected(detected);

		return () => {
			Quagga.offDetected(detected);
		};
  }, []);

  const detected = result => {
			Quagga.stop();
			onDetected(result);
  };

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
