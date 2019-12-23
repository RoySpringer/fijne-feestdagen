import React, { Component } from 'react';

export default class AnimatedImage extends Component {

    constructor(props) {
        super(props);
        this.element = null;
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onAnimationComplete = this.onAnimationComplete.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.styleTo = {...this.props.styleTo};
        this.styleFrom = {...this.props.styleFrom};
        if(this.styleFrom.transition) {
            this.styleTo.transition = this.styleFrom.transition;
        }
        if(this.props.flyIn) {
            this.styleFrom.transform = this.getTransformFromFlyIn(this.props.flyIn);
        }
        this.state = {
            loaded: false,
            imageLoaded: false,
            style: {...this.styleFrom}
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
            this.setState({
                style: this.styleTo
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
        })
    }

    onAnimationComplete(event) {
        this.element.removeEventListener("transitionend", this.onAnimationComplete);
        if (this.props.onComplete) {
            this.props.onComplete();
        }
    }

    onLoad() {
        this.setState({
            style: this.styleFrom,
            imageLoaded: true
        })
    }

    /**************************************/
    /* Functions
    /**************************************/
    getTransformFromFlyIn(flyIn) {
        let transform = '';
        let newDeg = Math.random() * 20 + 20;
        transform = 'rotate(' + newDeg + 'deg)';
        let searchString = flyIn.toLowerCase();
        if (searchString.search('top') !== -1) {
            transform += " translateY(-250%)";
        } else if (searchString.search('bottom') !== -1) {
            transform += " translateY(250%)";
        }
        if (searchString.search('left') !== -1) {
            transform += " translateX(-250%)";
        } else if (searchString.search('right') !== -1) {
            transform += " translateX(250%)";
        }
        return transform;
    }

    /**************************************/
    /* Renderer
    /**************************************/
    render() {
        let { image, id, className } = this.props;
        let attributes = {
            id,
            className,
            src: image.src,
            srcSet: image.srcSet
        }
        return (
            <img ref={img => this.element = img}  
                alt="" 
                style={this.state.style} 
                onLoad={this.onLoad} 
                {...attributes}></img>
        )
    }
}