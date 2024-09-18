import { axiosInstance } from "../utils/utils";
import { ENDPOINTS } from "./constant";

interface Person {
  name: string;
  gender: string;
  height: string;
  eye_color: string;
  mass: string;
}

interface PeopleResponse {
  results: Person[];
  count: number;
  
}
interface FetchPeopleResult {
  data: PeopleResponse | null;
  error: string | null;
}

export const fetchPeople = async (page: number): Promise<FetchPeopleResult> => {
  const responseData: FetchPeopleResult = { data: null, error: null };

  try {
    const res = await axiosInstance.get<PeopleResponse>(
      `${ENDPOINTS.people.root}?page=${page}`
    );

    responseData.data = res.data;
  } catch (error) {
    responseData.error =
      "There was an error while fetching people characteristics";
  }

  return responseData;
};

export const fetchPeopleBySearch = async (query: string): Promise<FetchPeopleResult> => {
  const responseData: FetchPeopleResult = { data: null, error: null };

  try {
    const res = await axiosInstance.get<PeopleResponse>(`${ENDPOINTS.people.root}?search=${query}`);
    responseData.data = res.data;
    
  } catch (error) {
    responseData.error = 'There was an error while fetching search results';
  }

  return responseData;
};
