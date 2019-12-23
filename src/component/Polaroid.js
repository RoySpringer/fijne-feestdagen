import React, { Component } from 'react';
import './Polaroid.scss';

export default class Polaroid extends Component {

    constructor(props) {
        super(props);
        this.element = null;
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onAnimationComplete = this.onAnimationComplete.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.styleTo = {...this.props.styleTo};
        this.styleFrom = {...this.props.styleFrom};
        this.state = {
            loaded: false,
            imageLoaded: false,
            style: {...this.props.styleFrom}
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
    /* Renderer
    /**************************************/
    render() {
        let { image, id } = this.props;
        let attributes = {
            src: image.src,
            srcSet: image.srcSet
        }
        return (
            <div id={id} className='polaroid' style={this.state.style} ref={img => this.element = img}>
                <img className="polaroid-image" {...attributes} alt="" onLoad={this.onLoad}></img>
            </div>
        )
    }
}