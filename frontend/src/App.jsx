import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/api/v1/books/"; 

// const baseURL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  // const [flag, setFlag] = useState(false);
  const [post, setPost] = useState([]);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await axios.post(`${baseURL}/create`, {
        name,
      });
      console.log(postResponse);
      setName("");
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleEditClick = (editName) => {
    setEditName(editName);
  };

  const handleInputChange = (e) => {
    setEditName((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEdit = async (id) => {
    try {
      const data = await axios.put(`${baseURL}/update/${id}`, {
        name: editName?.name,
      });

      console.log(data);

      setEditName({});
      // Reset editName state
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleDelete = async (id) => {
    try {
      const postResponse = await axios.delete(`${baseURL}/delete/${id}`, {});
      console.log(postResponse);
      setPost(post.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-4 flex">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <form onSubmit={handleSubmit}>
          <input
            name={name}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add New Book</button>
        </form>
        <br />
        <p>
          {post?.map((post) => (
            <li key={post.id}>
              {/* {post.id} {console.log(editName.id, post.id)} */}
              {editName.id == post.id ? (
                <>
                  <input
                    type="text"
                    value={editName?.name}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleEdit(post.id)}>Save</button>
                </>
              ) : (
                <>
                  {post.name}
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                </>
              )}
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </p>
      </div>
    </>
  );
}

export default App;
