import axios from "axios";

async function fetchPosts() {
	const { data } = await axios.get("http://localhost:3000/api/users");
	return data;
}

export default fetchPosts;
