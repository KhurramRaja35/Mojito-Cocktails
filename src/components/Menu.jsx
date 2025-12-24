'use client';
import React, {useRef, useState} from 'react';
import {allCocktails} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
    const currentRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(()=>{
        gsap.fromTo("#title",{opacity:0},{opacity:1, duration:1,});
        gsap.fromTo(".cocktail img",{opacity:0, xPercent:-100,},{opacity:1,xPercent:0,duration:1,ease:"power1.inOut"});
        gsap.fromTo(".details h2",{yPercent:100, opacity:0,},{yPercent:0,opacity:1,ease:"power1.inOut"});
        gsap.fromTo(".details p",{yPercent:100, opacity:0,},{yPercent:0,opacity:1,ease:"power1.inOut"});


    },[currentIndex]);//why did here we gave currentIndex in the dependency? Well, when you provide something, a specific variable within the dependency array, it'll rerun all of the animations within it whenever this variable changes. So, here whenever we change the slider from one cocktail to another we want to rerun the animation for that other cocktail.

    useGSAP(()=>{
        gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top top',
                bottom:'bottom top',
                scrub: true,
            }
        }).to("#m-right-leaf",{
            y:200,
        },0).to("#m-left-leaf",{y:-200}, 0)
    })

    const totalCocktails = allCocktails.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails; // this one is a great concept cz we have limited cocktails and once it end what will we do we have like here we have only 4 so after 4 where would we go to nothing nah we go back to first cz of the math and remainder operator. the remainder operator returns the remaining value after division here look at the case: (1+4)/4=1 so when we hit last one (4+4)/4=0 back to first
        setCurrentIndex(newIndex);

    }

    const getCocktailAt = (indexOffset)=>{
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    
  return (
    <section id={"menu"} aria-labelledby={"menu-heading"}>
        <img id={"m-left-leaf"} src={"/images/slider-left-leaf.png"} alt="left-leaf-slider" />
        <img id={"m-right-leaf"} src={"/images/slider-right-leaf.png"} alt="right-leaf-slider" />

        <h2 id={"menu-heading"} className={"sr-only"}>
            Cocktail Menu
        </h2>


        <nav className={"cocktail-tabs"} aria-label={"Cocktail Navigation"}>
            {allCocktails.map((cocktail,index)=>{
                const isActive = index===currentIndex;

                return(
                    <button key={cocktail.id} className={`${isActive ? 'text-white border-white': 'text-white/50 border-white/50' }`}
                    onClick={() => goToSlide(index)}
                    >
                        {cocktail.name}
                    </button>
                )
            })}
        </nav>

        <div className={"content"}>
            <div className={"arrows"}>
                <button className={"text-left"} onClick={()=>{goToSlide(currentIndex - 1)}}>
                    <span>{prevCocktail.name}</span>
                    <img
                        src={"/images/right-arrow.png"}
                        alt="right-arrow-slider"
                        aria-hidden={true}
                    />
                </button>
                <button className={"text-left"} onClick={()=>{goToSlide(currentIndex + 1)}}>
                    <span>{nextCocktail.name}</span>
                    <img
                        src={"/images/left-arrow.png"}
                        alt="left-arrow-slider"
                        aria-hidden={true}
                    />
                </button>
            </div>
            <div className={"cocktail"}>
                <img
                    src={currentCocktail.image}
                    className={"object-contain"}
                    alt="current cocktail"
                />
            </div>
            <div className={"recipe"}>
                <div ref={currentRef} className={"info"}>
                    <p>Recipe for:</p>
                    <p id={"title"}>{currentCocktail.name}</p>
                </div>
                <div className={"details"}>
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Menu;
