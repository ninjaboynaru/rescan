import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import withModal from '../withModal';
import { DataListContainer, DataListButtonHeader } from '../DataList';
import ProductDataRow from './ProductDataRow';
import ProductEditDataRow from './ProductEditDataRow';
import nsnBarcodeListener from '../nsnBarcodeListener';
import Button from '../Button';
import EDIT_MODE from '../EDIT_MODE';

const db = window.db;
const getFLISProduct = window.getFLISProduct;

class InventoryScanMode extends React.Component {
	constructor(props) {
		super(props);

		this.state = { products: null, editMode: null, productEditId: null, productNewNSN: null, audioFeedback: true };
		this.scannedNSN = null;
		this.audioElementRef = React.createRef();

		this.onNSNScan = this.onNSNScan.bind(this);
		this.saveProduct = this.saveProduct.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
	}

	componentDidMount() {
		nsnBarcodeListener.addAddListener(this.onNSNScan);
	}

	componentWillUnmount() {
		nsnBarcodeListener.removeListener(this.onNSNScan);
	}

	onNSNScan(nsn) {
		const { editMode, audioFeedback } = this.state;

		if (editMode !== null) {
			return;
		}

		const matchingProducts = db.incrementByNSN(nsn);

		if (matchingProducts === false) {
			return this.props.dbError();
		}

		if (matchingProducts.length === 0) {
			this.setState({ products: null, editMode: EDIT_MODE.NEW, productNewNSN: nsn });
		}
		else {
			this.setState({ products: matchingProducts });
		}

		if (audioFeedback === true) {
			this.audioElementRef.current.play();
		}

		this.scannedNSN = nsn;
	}

	saveProduct(product) {
		const { editMode, productEditId } = this.state;
		let success = false;

		if (editMode === EDIT_MODE.NEW) {
			success = db.createProduct(product);
		}
		else if (editMode === EDIT_MODE.MODIFY) {
			success = db.updateProduct(productEditId, product);
		}

		if (success === false) {
			this.props.dbError();
		}
		else {
			const products = db.getProductsByNSN(this.scannedNSN);
			this.setState({ products, editMode: null, productEditId: null, productNewNSN: null });
		}
	}

	editProduct(productId) {
		this.setState({ editMode: EDIT_MODE.MODIFY, productEditId: productId });
	}

	deleteProduct(productId) {
		const success = db.deleteProduct(productId);

		if (success === false) {
			this.props.dbError();
		}
		else {
			this.setState({ products: db.getProductsByNSN(this.scannedNSN) });
		}
	}

	deleteProductConfirmation(productID) {
		const confirmDelete = () => {
			this.props.modal.close();
			this.deleteProduct(productID);
		};
		const cancelDelete = () => this.props.modal.close();

		this.props.modal.open('Are You Sure?', () => (
			<div>
				<p>Are you sure you want to delete this Product?</p>
				<p>
					This can not be undone!
				</p>
				<div>
					<Button onClick={confirmDelete} danger>Yes</Button>
					<Button onClick={cancelDelete} primary>No</Button>
				</div>
			</div>
		));
	}

	cancelEdit() {
		this.setState({ editMode: null, productEditId: null, productNewNSN: null });
	}

	buildProductRows() {
		const { products, editMode, productEditId, productNewNSN } = this.state;

		if (editMode === EDIT_MODE.NEW) {
			const flisProduct = getFLISProduct(productNewNSN);
			let productNoun = '';

			if (flisProduct !== null && flisProduct !== undefined && flisProduct !== false) {
				productNoun = flisProduct.noun;
			}

			return <ProductEditDataRow product={{ noun: productNoun, nsn: productNewNSN, count: 1 }} onSaveClick={this.saveProduct} onCancelClick={this.cancelEdit} />;
		}
		if (products === null || products.length === 0) {
			return;
		}

		return products.map((product) => {
			let row;

			if (editMode === EDIT_MODE.MODIFY && product.id === productEditId) {
				row = <ProductEditDataRow key={product.id} product={product} onSaveClick={this.saveProduct} onCencelClick={this.cancelEdit} />;
			}
			else {
				const onEditClick = () => this.editProduct(product.id);
				const onDeleteClick = () => this.deleteProductConfirmation(product.id);
				row = <ProductDataRow key={product.id} product={product} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />;
			}

			return row;
		});
	}

	buildAudioToggle() {
		const { audioFeedback } = this.state;
		const onClick = () => this.setState({ audioFeedback: !audioFeedback });
		let btnOutline;
		let icon;

		if (audioFeedback === false) {
			btnOutline = true;
			icon = faVolumeMute;
		}
		else {
			btnOutline = false;
			icon = faVolumeUp;
		}

		return <Button primary outline={btnOutline} onClick={onClick}><FontAwesomeIcon icon={icon} /></Button>;
	}

	render() {
		return (
			<>
				<DataListButtonHeader className="inventory-btn-container">{this.buildAudioToggle()}</DataListButtonHeader>
				<DataListContainer>
					{this.buildProductRows()}
					<audio ref={this.audioElementRef}><source src="beep.wav" /></audio>
				</DataListContainer>
			</>
		);
	}
}

export default withModal(InventoryScanMode);
