import React, { Component } from 'react';
import styled from 'styled-components';
import { ReactComponent as Giftbox } from '../img/gift-box.svg';
import './Loader.scss';

const LoaderWrapper = styled.span`
 
    /* svg animations */
    @keyframes rotate {
        0% { transform: rotate(0deg) }
        15% { transform: rotate(10deg) translateY(-10px) }
        25% { transform: rotate(-5deg) translateY(10px) }
        35% { transform: rotate(10deg) translateY(-10px) }
        45% { transform: rotate(-10deg) translateY(10px) }
        100% { transform: rotate(0deg translateY(0px)) }
    }

    @keyframes rotateBox {
        0% { transform: rotate(0deg) }
        15% { transform: rotate(5deg) translateY(-10px) }
        25% { transform: rotate(-5deg) translateY(10px) }
        35% { transform: rotate(5deg) translateY(-10px) }
        45% { transform: rotate(-5deg) translateY(10px) }
        100% { transform: rotate(0deg translateY(0px)) }
    }

    @keyframes rotateLint {
        0% { transform: rotate(5deg) }
        15% { transform: rotate(5deg) translateY(-10px) }
        25% { transform: rotate(-5deg) translateY(10px) }
        35% { transform: rotate(5deg) translateY(-10px) }
        45% { transform: rotate(-5deg) translateY(10px) }
        100% { transform: rotate(0deg translateY(0px)) }
    }

    #top {
        animation: rotate 1s infinite;
        transform-origin: center;
    }
    #bottom {
        animation: rotateBox 1s infinite;
        transform-origin: center;
    }

    #lint {
        animation: rotateLint 1s infinite;
        transform-origin: center;
    }

    svg {
        height: 60%;
        overflow: visible;
        width: 60%;
        display: block;
        top: 50%;
        margin: auto; 
    }
`;


export default class Loader extends Component {

    constructor(props) {
        super(props);
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onComplete = this.onComplete.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            loading: props.loading || true,
            style: {
                transition: 'all 500ms ease-out 1s'
            },
            className: '',
            loadingText: 'Het pakketje voorbereiden'
        }
        this.element = null;
    }

    /**************************************/
    /* Component lifecicle methods
    /**************************************/
    componentDidMount() {
        window.addEventListener('load', this.onPageLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.onPageLoad);
    }

    /**************************************/
    /* Eventhandlers
    /**************************************/
    onComplete() {
        this.element.removeEventListener("transitionend", this.onComplete);
        if(this.props.onComplete) {
            this.props.onComplete();
        }
    }

    onPageLoad() {
        this.setState({
            loading: false,
            loadingText: 'Click op het pakketje om hem te openen'
        });
    }

    onClick() {
        if(this.state.loading === false) {
            this.setState({
                className: 'animate-out'
            });
            this.element.addEventListener("transitionend", this.onComplete, false);
        }
    }

    /**************************************/
    /* Renderer
    /**************************************/
    render() {
        
        return (
            <div id='loader' style={this.state.style} className={this.state.className} ref={wrapper => this.element = wrapper}>
                <LoaderWrapper onClick={this.onClick}>
                    <Giftbox/>
                    {this.state.loading ? 
                    <p className="loadingText" >{this.state.loadingText}<span>.</span><span>.</span><span>.</span></p> :
                    <p className={"loadingText loadComplete"} >{this.state.loadingText}</p>}
                    
                </LoaderWrapper>
            </div>
        )
    }
}