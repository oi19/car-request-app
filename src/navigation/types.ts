import { CarRequest } from "@/domain/entities/CarRequest";

export type RootStackParamList = {
  CarRequests: undefined;
  CarRequestDetails: {
    carRequest: CarRequest;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
