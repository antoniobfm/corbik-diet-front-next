export default interface IFoodLog {
	food_id: string;
	name: string;
	carbohydrates: number;
	proteins: number;
	fats: number;
	calories: number;
	quantity_amount: number;
	quantity_type: string;
	when: Date;
	food_version_id: string;
}
