import React, { Component } from 'react';

export default class Image extends Component {

    constructor(props) {
        super(props);
        this.flyIn = this.props.flyIn || '';
        this.element = null;
        this.tween = null;
        this.animateClass = 'animate';
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onAnimationComplete = this.onAnimationComplete.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.styleTo = {
            ...this.props.style,
            opacity: 1
        };
        this.state = {
            loaded: false,
            className: this.props.className,
            style: {...this.props.style, opacity: 0}
        }
    }

    /**************************************/
    /* Component lifecicle methods
    /**************************************/
    componentDidMount() {
        window.addEventListener('load', this.onPageLoad);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loaded === false && this.state.loaded) {
            this.element.addEventListener("transitionend", this.onAnimationComplete);
            let style = this.styleTo;
            if(style.transform.search('translateX') === -1) {
                style.transform += ' translateX(0)';    
            }
            if(style.transform.search('translateY') === -1) {
                style.transform += ' translateY(0)';
            }
            this.setState({
                style: style
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.onPageLoad);
        this.element.removeEventListener("transitionend", this.onAnimationComplete, false);
    }

    /**************************************/
    /* Eventhandlers
    /**************************************/
    onPageLoad() {
        this.setState({
            loaded: true,
            className: this.state.className + ' ' + this.animateClass,
        })
    }

    onAnimationComplete(event) {
        this.element.removeEventListener("transitionend", this.onAnimationComplete);
        if (this.props.onComplete) {
            this.props.onComplete();
        }
        this.setState({
            className: this.state.className.replace(this.animateClass, '')
        });
    }

    onLoad() {
        let animPropsFrom = {
            ...this.state.style,
        };
        let newDeg = Math.random() * 20 + 20;
        if(animPropsFrom.transform) {
            let regEx = /[+-]?([0-9]*[.])?[0-9]+(?=deg)/gi;
            let currentDeg = animPropsFrom.transform.match(regEx);
            if(currentDeg) {
                newDeg = parseFloat(currentDeg) + newDeg;
            }
        }
        animPropsFrom.transform = 'rotate(' + newDeg + 'deg)';
        let searchString = this.flyIn.toLowerCase();
        if (searchString.search('top') !== -1) {
            animPropsFrom.transform += " translateY(-500px)";
        } else if (searchString.search('bottom') !== -1) {
            animPropsFrom.transform += " translateY(500px)";
        }
        if (searchString.search('left') !== -1) {
            animPropsFrom.transform += " translateX(-500px)";
        } else if (searchString.search('right') !== -1) {
            animPropsFrom.transform += " translateX(500px)";
        }

        console.log("Style from: " +
        animPropsFrom)

        this.setState({
            style: animPropsFrom,
        })
    }

    /**************************************/
    /* Renderer
    /**************************************/
    render() {
        let { image, alt } = this.props;
        let attributes = {
            src: image.src,
            srcSet: image.srcSet,
            alt
        }
        return (
            <img ref={img => this.element = img} {...attributes} style={this.state.style} className={this.state.className} onLoad={this.onLoad}></img>
        )
    }
}