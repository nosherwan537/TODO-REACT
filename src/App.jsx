import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';



function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const[showFinished,setShowFinished]=useState(true);
    useEffect(()=>{
        let todoString=localStorage.getItem("todos");
        if(todoString){
        let todos=JSON.parse(localStorage.getItem("todos"))
        setTodos(todos)}
    },[])
    const saveToLs=(params) => {
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    
    const handleDelete = (e,id) => {
        let newTodos=todos.filter(item=>{
            return item.id!==id;
        })
        setTodos(newTodos)
        saveToLs();
    };
    const toggleFinish=(params) => {
        setShowFinished(!showFinished)
      
    }
    
    const handleAdd = () => {
        setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
        setTodo("");
        saveToLs();
    };
    const handleEdit = (e,id) => {
        let t=todos.filter(i=>i.id===id)
        setTodo(t[0].todo);
        let newTodos=todos.filter(item=>{
            return item.id!==id;
        })
        setTodos(newTodos)
        saveToLs();
    };
    const handleChange = (e) => {
        setTodo(e.target.value);
    };
    const handleCheckBox=(e) => {
      let id=e.target.name;
      let index=todos.findIndex(item=>{
        return item.id===id;
      })
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos)
      saveToLs();
      
    }
    
    return (
        <>
            <Navbar />
            <div className="mx-3 md:container bg-gradient-to-r from-zinc-400 to-red-200 md:mx-auto my-5 p-4 min-h-[80vh] rounded-lg divide-y md:w-1/2">
                <h1 class="italic text-blue-950 flex justify-center">SET YOUR DYNAMIC TODOS</h1>
                <div className="add ">
                    <h2 className="font-bold relative left-8 text-blue-950">
                        ADD A TODO
                    </h2>
                    <input
                        value={todo}
                        onChange={handleChange}
                        type="text"
                        className="text rounded-md h-9 w-72"
                    />
                    <button
                        onClick={handleAdd} disabled={todo.length<=3}
                        className="bg-orange-300 mx-4 rounded-md p-2 w-24 disabled:bg-gray-700 disabled:text-white"
                    >
                        Add
                    </button>
                </div>
                <input onChange={toggleFinish} type="checkbox" checked={showFinished} /> Show Finished
                <div></div>
                <div className="display p-8">
                    <h2 className="font-bold text-blue-950">
                        MY TODO
                    </h2>
                    {todos.length===0&& <div className="font-bold">Nothing here!</div>}
                    {todos.map((item) => {
                        return(showFinished||!item.isCompleted)&& (
                            <div
                                key={item.id}
                                className="todo flex m-2 items-center  justify-between"
                            >
                                <input name={item.id} onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} id="" />
                                <div
                                    className={
                                        item.isCompleted ? "line-through" : ""
                                    }
                                >
                                    {item.todo}
                                </div>
                                <div className="buttons">
                                    <button
                                        onClick={(e)=>{handleDelete(e,item.id)}}
                                        className="bg-orange-300 mx-4 rounded-md p-2 w-8"
                                    >
                                        <MdOutlineDeleteOutline />
                                    </button>
                                    <button
                                        onClick={(e)=>{handleEdit(e,item.id)}}
                                        className="bg-orange-300 mx-4 rounded-md p-2 w-8"
                                    >
                                        <CiEdit />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
