import React from 'react';
import styled from 'styled-components';
import PrimaryImage from './imageGallery/PrimaryImage.jsx';
import Showcase from './imageGallery/Showcase.jsx';
import ExpandedView from './imageGallery/ExpandedView.jsx';
import Checkout from './checkout/Checkout.jsx';
import ProductDescription from './information/ProductDescription.jsx';
import ProductInformation from './information/ProductInformation.jsx';
import SelectStyle from './information/SelectStyle.jsx';

const Pictures = styled.div`
  width: 100%;
  position: relative;
  margin: 20px auto;
  justify-content: center;
  display: flex;
  flex-direction: row;
  min-height: 800px;
`;

const Div = styled.div`
  display: inline-block;
  padding-left: 30px;
  width: 40%;
  vertical-align: middle;
  height: 100%;
  overflow: 'auto';
`;

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: undefined,
      selectedPhoto: '',
      productInfo: undefined,
    };
    this.changeStyle = this.changeStyle.bind(this);
  }
  componentDidMount() {
    this.setState({
      selectedStyle: this.props.defaultStyle,
      productInfo: this.props.productInfo,
    });
  }

  componentDidUpdate() {
    if (this.state.productInfo !== this.props.productInfo) {
      this.setState({
        productInfo: this.props.productInfo,
        selectedStyle: this.props.defaultStyle,
      });
    }
  }

  changeStyle(id) {
    this.setState({
      selectedStyle: this.props.styleList.find(
        (element) => element.style_id === id
      ),
      productId: this.props.productInfo.id,
    });
  }

  changePhoto(photoId) {
    this.setState({ selectedPhoto: photoId });
  }

  render() {
    // console.log('this is the current style ', this.state.selectedStyle);
    if (this.state.productInfo && this.state.selectedStyle && this.props.rating) {
      return (
        <>
          <h1 id="overviewHead">Product Overview!</h1>
          <Pictures>
            <Showcase id={this.state.selectedStyle.style_id} photos={this.state.selectedStyle.photos} currentPhoto={this.changePhoto}/>
            <Div>
              <Checkout id={this.state.selectedStyle.style_id} skus={this.state.selectedStyle.skus} outfitAdder={this.props.outfitAdder} outfitItems={this.props.outfitItems} outfitItemsIDs={this.props.outfitItemsIDs}/>
              <ProductInformation category={this.props.productInfo.category} name={this.props.productInfo.name}
                price={this.state.selectedStyle.original_price} salePrice={this.state.selectedStyle.sale_price} rating={this.props.rating}/>
              <SelectStyle styles={this.props.styleList} changeStyle={this.changeStyle} selectedStyle={this.state.selectedStyle}/>
              <ProductDescription slogan={this.props.productInfo.slogan} description={this.props.productInfo.description} features={this.props.productInfo.features}/>
            </Div>
          </Pictures>
        </>
      );
    }
  }
}

export default ProductOverview;
