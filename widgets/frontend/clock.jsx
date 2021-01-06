import React from 'react';

class Clock extends React.Component{
    constructor() {
        super();
        this.state = { time : new Date() };
        this.tick = this.tick.bind(this); // called by setInterval within did mount 
        this.id = null;
        this.rotate = this.rotate.bind(this)
    }

    rotate() {
        const card = document.querySelector(".card");
        const container = document.querySelector(".container");

        container.addEventListener("mousemove", (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 1.5;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 1.5;

            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
        })

        container.addEventListener("mouseenter", (e) => {
            card.style.transition = "none";
        })

        container.addEventListener("mouseleave", (e) => {
            card.style.transition = "all 0.5 ease";
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        })


    }

    // here the {} braces are similar to erb tags
    render() {
        return (
            <div className= "container" onMouseMove={ this.rotate }>
                <div className="card">
                    <h1>Clock</h1>
                    <br />
                    { this.state.time.getHours() % 12}: { this.state.time.getMinutes() }: { this.state.time.getSeconds() } 
                    <br />
                    { this.state.time.getUTCMonth() + 1 }- { this.state.time.getUTCDate() }- { this.state.time.getFullYear() } 
                </div>
            </div>
        )
    }

    // here the {} braces are are a hash like object same as line 6
    // called by this.tick
    // setState then calls render
    tick() {
        this.setState (
            { time: new Date() }
        )
    }

    //  setInterval is async, which is why we use componentDidMount to make sure we have everything on the page first
    // first thing to happen when page loads, calls this.tick
    componentDidMount() {
        this.id = setInterval(this.tick, 1000);
    } 

    // last thing to be called
    // resets id, so it can do a completely different tick
    componentWillUnmount() {
        clearInterval(this.id);
    }
}

// const card = document.querySelector(".card");
// const container = document.querySelector(".container");

// container.addEventListener("mousemove", (e) => {
//     let xAxis = window.innerWidth / 2 - e.pageX;
//     let yAxis = window.innerHeight / 2 - e.pageY;

//     card.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`
// })

export default Clock;