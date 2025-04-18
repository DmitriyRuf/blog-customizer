import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	/*Создаем состояние для стилей страницы*/
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			{/*Функцию setState передаем как пропс в компонент ArticleParamsForm*/}
			<ArticleParamsForm setApp={setState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
