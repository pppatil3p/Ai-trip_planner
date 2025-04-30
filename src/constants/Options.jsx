import solo from '../assets/solo-traveller.jpg'
import coupleImg from '../assets/couple.jpg'
import familyImg from '../assets/family.jpeg'
import friendsImg from '../assets/friends.jpg'
import c from '../assets/c.jpeg'
import m from '../assets/m.jpeg'
import l from '../assets/l.jpg'


export const SelectTravelestList=[
 
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler ',
        icon: ' ',
        people: '1',
        image: solo
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Two travelers ',
        icon: '',
        people: '2',
        image: coupleImg
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group',
        icon: '',
        people: '3 to 5 people',
        image: familyImg  
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A group',
        icon: '',
        people: '5 to 10 people',
        image: friendsImg  
    }
];


export const SelectBudgetOptions=
[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Cost-effective',
        icon: ' ',
        image: c
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Average cost',
        icon: '',
        image: m
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Comfortable',
        icon: '',
        image: l
    }
]

export const AI_Prompt='Genrate Travel Plan For Location :{location}, for {totaldays} days for{traveler} with a {budget} budget,give me hotels options list with with hotelname , hotel address , price image url , geo coordinates, ticket pricing,time travel each of the location for {totaldays} days with each day plan with best time to visit in JSON format'