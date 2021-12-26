import { Routes, Route } from "react-router-dom";
import About from '../components/about/about'
import Contact from '../components/contact/contact'
import Home from '../components/home/home'
import Users from '../components/users/users'
import Location from "../components/locations/locations";
export default function MainRouter(){
    return (
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/locations" element={<Location/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
    )
}
