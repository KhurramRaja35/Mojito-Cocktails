import React from 'react';
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText, ScrollTrigger} from "gsap/all";


gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {

  useGSAP(()=>{
    const titleSplit = SplitText.create("#about h2",{
      type:"words",
    })

    const scrollTimeline = gsap.timeline({
      scrollTrigger:{
        trigger:"#about",
        start:"top center",

      }
    })

    scrollTimeline
        .from(titleSplit.words,{
          opacity:0,
          duration:1,
          yPercent:100,
          stagger:0.02,
          ease:"expo.out",
        })
        .from(".top-grid div, .bottom-grid div",{
          opacity:0,
          duration:1,
          ease:"power1.inOut",
          stagger:0.04,
        }) // },"-=0.5") what will this do it will make the animation start before the previous one end (about 0.5 sec early)
  })

  return (
    <div id={"about"}>
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className={"badge"}>
              Best Cocktails
            </p>
            <h2>
              Where every details matters <span className={"text-white"}>-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className={"sub-content"}>
            <p>
            Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className={"md:text-3xl text-xl font-bold"}>
                <span>4.5</span>/5
              </p>
              <p className={"text-sm text-white-100"}>
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <img src={"/images/abt1.png"} alt="grid-img1" />
          <div className={"noisy"}></div>
        </div>
        <div className="md:col-span-6">
          <img src={"/images/abt2.png"} alt="grid-img2" />
          <div className={"noisy"}></div>
        </div>
        <div className="md:col-span-3">
          <img src={"/images/abt5.png"} alt="grid-img5" />
          <div className={"noisy"}></div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
            <img src={"/images/abt3.png"} alt="grid-img3" />
          <div className={"noisy"}></div>
        </div>
        <div className="md:col-span-4">
            <img src={"/images/abt4.png"} alt="grid-img4" />
          <div className={"noisy"}></div>
        </div>
      </div>
    </div>
  );
};

export default About;
