import React, { Component } from 'react';
import './App.scss';
import anise from './img/xmas_assets/hejho_mockup_anise.png';
import silverPearl from './img/xmas_assets/hejho_mockup_bauble-silver_pearl.png';
import silverGlitter from './img/xmas_assets/hejho_mockup_bauble-silver-glitter.png';
import vertical from './img/xmas_assets/hejho_mockup_bouble-vertical.png';
import stars from './img/xmas_assets/hejho_mockup_bouble-with-stars.png';
import candy from './img/xmas_assets/hejho_mockup_candy.png';
import card1 from './img/xmas_assets/hejho_mockup_card1.png';
import card2 from './img/xmas_assets/hejho_mockup_card2.png';
import circle from './img/xmas_assets/hejho_mockup_chain-circle.png';
import clip from './img/xmas_assets/hejho_mockup_clip.png';
import cloves from './img/xmas_assets/hejho_mockup_cloves.png';
import cones1 from './img/xmas_assets/hejho_mockup_cones1.png';
import cones2 from './img/xmas_assets/hejho_mockup_cones2.png';
import heart from './img/xmas_assets/hejho_mockup_cookie-heart.png';
import star from './img/xmas_assets/hejho_mockup_decoration-star.png';
import star2 from './img/xmas_assets/hejho_mockup_decoration-star2.png';
import decoration1 from './img/xmas_assets/hejho_mockup_decoration1.png';
import decoration2 from './img/xmas_assets/hejho_mockup_decoration2.png';
import gift1 from './img/xmas_assets/hejho_mockup_gift1.png';
import gift2 from './img/xmas_assets/hejho_mockup_gift2.png';
import light from './img/xmas_assets/hejho_mockup_light.png';
import nutcracer from './img/xmas_assets/hejho_mockup_nutcracer.png';
import nuts1 from './img/xmas_assets/hejho_mockup_nuts1.png';
import nuts2 from './img/xmas_assets/hejho_mockup_nuts2.png';
import plate from './img/xmas_assets/hejho_mockup_plate.png';
import stars2 from './img/xmas_assets/hejho_mockup_stars.png';
import twigPine from './img/xmas_assets/hejho_mockup_twig-pine.png';
import twigThuja from './img/xmas_assets/hejho_mockup_twig-thuja.png';
import twig1 from './img/xmas_assets/hejho_mockup_twig1.png';
import twig2 from './img/xmas_assets/hejho_mockup_twig2.png';
import red from './img/xmas_assets/hejho_mockup_twine-red.png';
import twine from './img/xmas_assets/hejho_mockup_twine.png';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.sources = [];
    this.imagesToLoad = 0;
    this.imagesLoaded = 0;
    this.state = {
      start: "Beste",
      name: "Test & test",
      wishes: "Fijne Kerstdagen",
      theme: "christmas",
      loading: true
    }
  }

  imageLoaded() {
    this.imagesLoaded++;
    if (this.imagesToLoad === this.imagesLoaded) {
      this.setState({
        loading: false
      });
    }
  }

  createImage(classString, src, alt, style) {
    if (this.sources.indexOf(src) == -1) {
      this.imagesToLoad++;
      this.sources.push(src);
    }
    return (
      <img className={classString + " fade-in" + (this.state.loading === false ? " loaded":"")} src={src} alt={alt} style={style} onLoad={() => this.imageLoaded()}></img>
    )
  }

  componentDidMount() {
    this.parseNames();
  }

  parseNames() {
    // Test%20%26%20Test
    console.log(encodeURI("Test & test"))
    let url = new URL(window.location.href);
    let urlNames = url.pathname.substring(1, url.pathname.length);
    let names = decodeURI(urlNames);
    this.setState({
      name: names
    })
  }

  render() {
    let twigPineStyle = {
      top: -150,
      right: -10,
      transform: "rotate(" + ((Math.random() * 40) + 280) + "deg)"
    }
    let twigThujaStyle = {
      top: 30,
      right: -150,
      transform: "rotate(" + (0 - (Math.random() * 80)) + "deg)"
    }
    let silverPearlStyle = {
      top: -30,
      right: 50,
      transform: "rotate(" + ((Math.random() * 80) - 40) + "deg)"
    }
    let silverGlitterStyle = {
      top: -30,
      right: -50,
      transform: "rotate(" + ((Math.random() * 60) - 30) + "deg)"
    }
    let decoration2Style = {
      bottom: -70,
      left: -60,
      transform: "rotate(" + ((Math.random() * 60) - 30) + "deg)"
    }
    let cones2Style = {
      bottom: -70,
      left: window.innerWidth / 3,
      transform: "rotate(" + ((Math.random() * 10) - 15) + "deg)"
    }
    
    return (
      <div>
        <div className={"App random-background-" + Math.round(Math.random() * 4 + 1)}>

          <div className="layer-2">
            <header className="App-header">
              {this.createImage("card", card2, "", {})}
              {/* <img className="card" src={card2}></img> */}
              <p style={{zIndex: 1,transform: "rotate(" + ((Math.random() * 60) - 30) + "deg)"}}>
                <span className={this.state.theme + "-between"}>{this.state.name !== "" && this.state.start + " " + this.state.name + ","}</span><br></br>
                <span className={this.state.theme + "-wishes"}>{this.state.wishes}</span><br></br><br></br>
                <span className={this.state.theme + "-names"}>{this.state.end} Roy & Pris</span> 

              </p>
            </header>
          </div>
          {/* <div className="layer-3">

        </div> */}
          <div className="layer-1">
            <div className="groupTopLeft">

            </div>
            <div className="groupTopRight">
              {this.createImage("large", twigPine, "", twigPineStyle)}
              {this.createImage("large", twigThuja, "", twigThujaStyle)}
              {this.createImage("small", silverPearl, "", silverPearlStyle)}
              {this.createImage("small", silverGlitter, "", silverGlitterStyle)}
              {/* <img className="large" src={twigPine} alt="twig1" style={twigPineStyle} onLoad={this.imageLoaded}></img> */}
              {/* <img className="large" src={twigThuja} alt="twig2" style={twigThujaStyle} onLoad={this.imageLoaded}></img>
            <img className="small" src={silverPearl} alt="twig2" style={silverPearlStyle} onLoad={this.imageLoaded}></img>
          <img className="small" src={silverGlitter} alt="twig2" style={silverGlitterStyle} onLoad={this.imageLoaded}></img> */}

            </div>
            <div className="groupBottomLeft">
              {this.createImage("large", decoration2, "", decoration2Style)}
              {this.createImage("small", cones2, "", cones2Style)}
              {/* <img className="large" src={decoration2} alt="twig1" style={decoration2Style} onLoad={this.imageLoaded}></img>
            <img className="small" src={cones2} alt="twig1" style={cones2Style} onLoad={this.imageLoaded}></img> */}

            </div>
            <div className="groupBottomRight">

              {this.createImage("large", gift2, "", { transform: "rotate(" + ((Math.random() * 90) - 45) + "deg)" })}
              {/* <img className="large" src={gift2} alt="anise" style={{
                transform: "rotate(" + ((Math.random() * 90) - 45) + "deg)"
              }} onLoad={this.imageLoaded}></img> */}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

