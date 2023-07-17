import StreamForm from '../SteamForm/StreamForm';
import styles from './PageAddStream.module.scss'

const PageAddStream = () => {
	return (
		<div className={styles.form}>
			<StreamForm />
		</div>
	)
}

export default PageAddStream;