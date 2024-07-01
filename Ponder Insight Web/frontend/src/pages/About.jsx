import React, { useState } from 'react';
import aboutimg1 from '../assets/images/img9.jpg';
import img10 from '../assets/images/img10.jpg';
import img11 from '../assets/images/img11.jpg';
import img12 from '../assets/images/img12.jpg';
import '../styles/About.css';
import axios from 'axios';

export default function About() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicker");
    console.log(name);
    console.log(email);
    console.log(description);

    await axios.post('http://localhost:3000/api/v1/user/sendmail', {
      name,
      email,
      description,

    }).then((res) => {

      console.log(res);

      alert('Email is Sent');


    })

    setName("");
    setEmail("");
    setDescription("");

  }


  return (
    <section id='About'>
      <div className="aboutimg">
        <img src={aboutimg1} alt="" />
        <p style={{ fontSize: '25px', fontWeight: 'bold' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Ex, dolore!</p> <br />
        <p style={{ fontSize: '13px' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni quibusdam laudantium  voluptates <br /> sit. Similique in eum odit, nostrum deserunt rerum.</p>

        <button>About Us</button>
      </div>

      <div className="aboutus">
        <h1>About Us</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, saepe sit. Enim esse ratione doloribus optio! Repellat odit consequuntur iure voluptate vitae impedit sed quos quam numquam tempora ab veritatis optio, voluptates nam, asperiores, odio adipisci velit maxime eaque unde laudantium esse repudiandae aperiam. Iure, et! Incidunt, aliquid iure. Qui sed, fuga aliquam eum at quod ut natus facere eveniet!

        </p>
      </div>




      <div className="Contact">
        <div className="ContactLeft">
          <h1 className=''>Contact Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>




          <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" name="" id="" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
            <textarea name="" id="" cols="30" rows="7" placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

            <div className="subbtn">
              <button type='submit'>Send Message</button>
            </div>

          </form>

        </div>

      </div>

    </section>
  )
}
