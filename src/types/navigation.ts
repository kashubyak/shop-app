import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootTabParamList = {
	Home: undefined
	Cart: undefined
	Profile: undefined
}

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<
	RootTabParamList,
	T
>
