"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIcon from "../../../public/leaflet/image/marker-icon.png";
import markerRetina from "../../../public/leaflet/image/marker-icon-2x.png";
import markerShadow from "../../../public/leaflet/image/marker-shadow.png";

interface MapProps {}

const Map: FC<MapProps> = ({}) => {
	const icon = new L.Icon({
		iconUrl: markerIcon.src,
		iconRetinaUrl: markerRetina.src,
		shadowUrl: markerShadow.src,
	});

	return (
		<>
			<MapContainer
				className="max-w-5xl w-full h-[448px] z-0"
				center={[-0.027262338196787347, 109.34703462494329]}
				zoom={13}
				scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[-0.0261250887096206, 109.32364844752222]} icon={icon}>
					<Popup>Location 1 Device 1</Popup>
				</Marker>
				<Marker position={[-0.04439543335253138, 109.35668646648554]} icon={icon}>
					<Popup>Location 2 Device 1</Popup>
				</Marker>
			</MapContainer>
		</>
	);
};

export default Map;
