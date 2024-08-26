import { useEffect, useRef, useState } from "react";

export default function ChambersMap({
	premises = [],
	chambers = [],
	center = undefined,
}: {
	chambers: Chamber[];
	premises?: Coordinates[];
	center?: Coordinates | undefined;
}) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<google.maps.Map>();
	const [premiseMarkers, setPremiseMarkers] = useState<google.maps.Marker[]>();
	const [chamberMarkers, setChamberMarkers] = useState<google.maps.Marker[]>();

	const focus = center || premises?.[0] || chambers?.[0];

	if (!focus) {
		console.error("Missinf map data", { center, premises, chambers });
		return null;
	}
	console.warn("Render map data", { center, premises, chambers, focus });

	useEffect(() => {
		if (mapRef.current) {
			const map = new google.maps.Map(mapRef.current, {
				center: new google.maps.LatLng(focus.latitude, focus.longitude),
				zoom: 12,
			});

			const premiseMarker = new google.maps.Marker({
				position: new google.maps.LatLng(focus.latitude, focus.longitude),
				icon: {
					url: "https://res.cloudinary.com/fynewo/image/upload/v1565602914/mapicons/people/000000/classic/townhouse.png",
					scaledSize: new google.maps.Size(32, 32),
				},
				map,
			});

			setMap(map);
			setPremiseMarkers([premiseMarker]);
		}
	}, [focus]);

	useEffect(() => {
		if (!map) return;
		const chamberMarkers: google.maps.Marker[] = !chambers?.length ? [] : chambers.map(
			(chamber, i) =>
				new google.maps.Marker({
					position: new google.maps.LatLng(chamber.latitude, chamber.longitude),
					icon: {
						url: `https://res.cloudinary.com/fynewo/image/upload/v1521746087/mapicons/numbers/000000/white/number_${
							i + 1
						}.png`,
						scaledSize: new google.maps.Size(32, 32),
					},
					map,
				})
		);
		setChamberMarkers(chamberMarkers);
	}, [map, chambers]);

	const markers: google.maps.Marker[] = [
		...(premiseMarkers || []),
		...(chamberMarkers || []),
	];
	useEffect(() => {
		if (!map) return;
		if (!markers) return;
		if (map && markers.length > 0) {
			const bounds = new google.maps.LatLngBounds();
			markers.forEach((marker: google.maps.Marker) => {
				//@ts-ignore
				bounds.extend(marker.getPosition());
			});
			map.fitBounds(bounds);
		}
	}, [map, markers]);

	return <div ref={mapRef} className="flex h-full"></div>;
}
