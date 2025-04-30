import React from 'react';
import './btn.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-7'>
      <h1 className='font-extrabold text-[45px] text-center my-8 mt-10'>
        <span className='text-[#f56551]'>Discover next trip with Ai:</span> Personalized itineraries at your fingertips
      </h1>
      <p className='text-xl text-gray-500 text-center'>
        Your personal trip planner and travel curator, creating itineraries tailored to your budget
      </p>
      <Link to={'/Trip'}>
        <button id='btn1' className='bg-gray-600 p-2 border-2 border-white rounded-full text-white font-bold hover:bg-gray-800'>Get started</button>
      </Link>
    </div>
  );
}

export default Hero;