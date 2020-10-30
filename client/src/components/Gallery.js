import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SpecialButton from './SpecialButton';
import './Gallery.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGear } from '../store/gear'
import { List } from '@material-ui/core';
import './Gallery.css'
import { useHistory} from "react-router-dom";





export default function Gallery( id ) {
    const history = useHistory();
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGear(id));
      }, [dispatch, id]);

    const profileGears = useSelector(state => state.gear)
    console.log(profileGears)


    const attributes =  (profileGear) => {
        let list2 = []
        let atts = profileGear.attributes
        for (let i=0; i<atts.length; i++) {
            list2.push(
                <div>
                    <span className="attributes">{atts[i].tag}: {atts[i].value}</span>

                </div>
            )


        }
    return list2
    }

    const carimages = () => {
        const list1 = []
        for (let i=0; i<profileGears.length; i++) {
            list1.push(
                <div className="containerguy">
                    <span className="gearname">{profileGears[i].name}</span>
                    <img className="imagebloke" src={profileGears[i].mediaLink}/>
                    <div className="attcontainer">
                        {attributes(profileGears[i])}
                    </div>

                </div>
            )
        }
        return list1
    }

    return (

        <div class="carousel-wrapper">
            <Carousel infiniteLoop useKeyboardArrows>
                {carimages()}
            </Carousel>

        </div>
    );
}
