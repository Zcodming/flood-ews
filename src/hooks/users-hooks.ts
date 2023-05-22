import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
	id: String;
	name: String;
	email: String;
	username: String;
	password: String;
	role: String;
}

const url = "http://localhost:3000/api/users";

export const usePost = () => {
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.post(url);
			return data as User;
		},
	});

	return { data, isLoading, error };
};

export const useGet = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const response = await axios.get(url);
			const data = await response.data;
			return data;
		},
	});
};

export const useGetID = (getId?: string) => {
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get(url + `/${getId}`);
			return data as User;
		},
	});

	return { data, isLoading, error };
};

export const usePut = (getId: string) => {
	const { data, isLoading, error } = useQuery({
		queryFn: async () => {
			const { data } = await axios.put(url + `/${getId}`);
			return data as User;
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
