export type Gu =
  | "부산진구"
  | "해운대구"
  | "중구"
  | "동래구"
  | "동구"
  | "남구"
  | "사하구"
  | "기장군"
  | "사상구"
  | "수영구"
  | "북구"
  | "강서구"
  | "금정구"
  | "연제구"
  | "서구"
  | "영도구";

export type Tag =
  | "24시간"
  | "해장"
  | "혼밥가능"
  | "주차"
  | "수육"
  | "현지인"
  | "관광객추천"
  | "노포"
  | "테이블많음"
  | "포장가능";

export interface MenuItem {
  name: string;
  price: number;
}

export interface Hours {
  /** 0=일요일 ~ 6=토요일. "24h" = 24시간, null = 휴무 */
  [day: number]: string | "24h" | null;
}

export interface Shop {
  id: string;
  name: string;
  gu: Gu;
  area: string;
  address: string;
  /** [경도(lng), 위도(lat)] */
  location: [number, number];
  description: string;
  tags: Tag[];
  price_min: number;
  hours: Hours;
  phone: string | null;
  menu_items: MenuItem[];
  avg_rating: number;
  review_count: number;
}

export interface Review {
  id: string;
  shop_id: string;
  user_id: string;
  user_name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  created_at: string;
}

export interface ShopWithDistance extends Shop {
  /** km 단위 거리. null이면 위치 미허용 */
  distance_km: number | null;
}
