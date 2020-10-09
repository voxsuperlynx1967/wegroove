import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import SpecialButton from './SpecialButton';
import './Gallery.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGear } from '../store/gear'
import { List } from '@material-ui/core';


export default function Gallery( id ) {
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
                    <span>{atts[i].tag}: {atts[i].value}</span>

                </div>
            )


        }
    return list2
    }

    const carimages = () => {
        const list1 = []
        for (let i=0; i<profileGears.length; i++) {
            list1.push(
                <div>
                    <span>{profileGears[i].name}</span>
                    <img src={profileGears[i].mediaLink}/>
                    <div className="attributes">
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
