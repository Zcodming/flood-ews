import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Location {
	address: String;
	details: String;
	userId: String;
}

const url = "https:localhost:3000/api/locations";

export const usePost = () => {
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.post(url);
			return data as Location;
		},
	});

	return { data, isLoading, error };
};

export const useGet = () => {
	return useQuery({
		queryFn: async () => {
			const { data } = await axios.get(url);
			return data as Location;
		},
	});
};

export const usePut = (getId: string) => {
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.put(url + `/${getId}`);
			return data as Location;
		},
	});

	return { data, isLoading, error };
};

export const useDelete = (getId: string) => {
	const { isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.delete(url + `/${getId}`);
		},
	});

	return { isLoading, error };
};
