import { useState, useRef, FormEvent } from 'react';
import { useClose } from '../../hooks/useClose';
/*Использем clsx для установки классов компонентов*/
import { clsx } from 'clsx';
/*Импортируем компоненты формы из UI*/
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
/*Импортируем объекты и типы проекта для формы настроек*/
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	OptionType,
	ArticleStateType,
	contentWidthArr,
} from '../../constants/articleProps';
/*Модуль стилей для формы настроек*/
import styles from './ArticleParamsForm.module.scss';
/*Пропсы  компонента формы настроек*/
export type ArticleParamsFormProps = {
	/*Функция состояния основной страницы*/
	setApp: (state: ArticleStateType) => void;
};
/*Тип для имен свойств формы настроек*/
export type ArticleStateTypeName = keyof ArticleStateType;

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setApp } = props;
	/*Состояние открытой формы настроек*/
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	/*Состояние объекта с классами стилей для формы настроек*/
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	/*Ссылка на комнпонент, содержащий форму настроек*/
	const asideRef = useRef<HTMLElement>(null);
	/*Хук для регистрации событий закрытия вне области формы настроек*/
	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: asideRef,
	});
	/*Функция события для измения полей объекта состояния компонента формы настроек*/
	const handleChangeParamsForm =
		(name: ArticleStateTypeName) => (value: OptionType) => {
			setState((state) => ({ ...state, [name]: value }));
		};
	/*Функция события формы для измения объекта состояния основной страницы проекта*/
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setApp(state);
	};
	/*Функция события формы для сброса объекта состояния к начальным значениям
	  компонента основной страницы проекта и компонента формы настроек*/
	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setState(defaultArticleState);
		setApp(defaultArticleState);
	};

	return (
		<>
			{/*Для компонента стрелки при клике меняем состояние открытия формы настроек*/}
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			{/*Для aside устанавливаем класс открытия контейнера формы в зависимости от состояния isOpen*/}
			{/*Для aside определяем ссылку для хука useRef*/}
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				{/*Для формы определяем события сброса и сабмита*/}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					{/*Заголовок формы*/}
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					{/*Поля формы на основе компонентов UI. Используемы параметры:
						1. selected - выбранное значение из состояние компонента формы настроек;
						2. options  - список доступных значений поля формы;
						3. onChange - событие изменения значения поля формы при котором меняем состоение state
						   компонента формы настроек;
						4. title    - заголовок поля формы;
						5. name     - имя группы переключателей;
					*/}
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChangeParamsForm('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChangeParamsForm('fontSizeOption')}
						title='размер шрифта'
						name='fontSize'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						onChange={handleChangeParamsForm('fontColor')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleChangeParamsForm('backgroundColor')}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleChangeParamsForm('contentWidth')}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
