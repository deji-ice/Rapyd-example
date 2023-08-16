import { RapydClient } from "@bebapps/rapyd-sdk";

export const Rapyd = new RapydClient(process.env.SECRET_KEY, process.env.ACCESS_CODE);
