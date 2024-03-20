import pandas as pd


class SaveCardCategory:

    def __init__(self):
        self.category_column_df = None
        self.extract_categories = set()
        self.data_df = None
        self.file_path = "../../../static/data/result/"

    def load_card_data(self):
        try:
            # DataFrame으로 데이터 불러오기
            self.data_df = pd.read_csv(self.file_path + "card_db.csv")
        except FileNotFoundError:
            print("Error: 'card_db.csv' 파일을 찾을 수 없습니다.")

    def load_categorized_data(self):
        try:
            self.category_column_df = pd.read_csv(self.file_path + "categories.csv")
        except FileNotFoundError:
            print("Error: 'categories.csv' 파일을 찾을 수 없습니다.")

    def extract_category_from_csv(self):
        # 중복을 제거한 카테고리를 저장할 집합
        # 각 행의 card_category 값을 확인하여 중복을 제거한 후 extract_categories 집합에 추가
        for category_row in self.data_df['card_category']:
            if pd.isnull(category_row):  # 빈 값인 경우 건너뜀
                continue
            # 만약 값이 숫자라면 문자열로 변환하여 처리
            if isinstance(category_row, float):
                category_row = str(category_row)
            categories = category_row.split(',')
            for category in categories:
                category = category.strip()  # 공백 제거
                if category != '':
                    self.extract_categories.add(category)

        for category_row in self.data_df['card_top_category']:
            if pd.isnull(category_row):  # 빈 값인 경우 건너뜀
                continue
            # 만약 값이 숫자라면 문자열로 변환하여 처리
            if isinstance(category_row, float):
                category_row = str(category_row)
            categories = category_row.split(',')
            for category in categories:
                category = category.strip()  # 공백 제거
                if category != '':
                    self.extract_categories.add(category)

        # print("after add top category")
        # print(self.extract_categories)
        # print("=======================")

    def save_category(self):
        # 카테고리 딕셔너리
        categories = {
            "communication": ['통신', 'KT', 'SKT', 'LGU+'],
            "shopping": ['백화점', '마트/편의점', '온라인쇼핑', '소셜커머스', '해외직구', '온라인 여행사', '홈쇼핑', 'SPA브랜드', '아울렛', '대형마트', 'SSM',
                         '전통시장', '면세점', '모든가맹점', '국내외가맹점'],
            "culture": ['영화', '공연/전시', '문화센터', '도서', '음원사이트', '영화/문화', '디지털구독'],
            "transportation": ['고속버스', '저가항공', '항공권', '기차', '대중교통', '렌터카', '택시', '자동차/하이패스', '하이패스', '충전소', '교통'],
            "food": ['카페', '패밀리레스토랑', '배달앱', '베이커리', '점심', '저녁', '일반음식점', '패스트푸드', '카페/디저트', '푸드'],
            "education": ['학습지', '유치원', '어린이집', '학원', '교육/육아'],
            "utilities": ['공과금', '공과금/렌탈'],
            "aviation": ['진에어', '대한항공', '아시아나항공', '제주항공', '항공마일리지'],
            "medical": ['약국', '병원', '동물병원', '병원/약국', '드럭스토어'],
            "others": ['프리미엄', '주유', '인테리어', '여행/숙박', '국민행복', '공항라운지', '레저/스포츠', '비즈니스', 'APP', '해피포인트', '하이브리드', '정비',
                       '금융', '제휴/PLCC', '해외이용', '네이버페이', '수수료우대', 'PAYCO', '간편결제', '리조트', '적립', '경기관람', '할인', '공항',
                       '캐시백', '렌탈', '보험사', '헤어', '테마파크', '해외', '선택형', '은행사', '자동차', '애완동물', '프리미엄 서비스', 'CJ ONE',
                       '공항라운지/PP', '주유소', '멤버십포인트', '바우처', '여행사', '골프', '라운지키', '지역', '호텔', '생활', '보험', 'PP', '피트니스',
                       '뷰티/피트니스', '게임', '무이자할부', '삼성페이', '카카오페이', 'OK캐쉬백', '유의사항', '화장품', '연회비지원', '무실적']
        }

        # 카테고리를 담은 리스트
        category_list = []
        for key, values in categories.items():
            category_list.append((key, ','.join(values)))

        # DataFrame 생성
        benefit_df = pd.DataFrame(category_list, columns=['category', 'benefit'])

        benefit_df.to_csv(self.file_path + 'categories.csv', index=False, encoding="utf-8")
        benefit_df.to_excel(self.file_path + 'categories.xlsx', index=False)

if __name__ == '__main__':
    set_card_category = SaveCardCategory()

    # # 카드 데이터 로드
    # set_card_category.load_card_data()
    #
    # # 카드 혜택 내 키워드 추출
    # set_card_category.extract_category_from_csv()
    # 카테고리 저장
    # set_card_category.save_category()

    # 카테고리 데이터로드하여 출력
    set_card_category.load_categorized_data()
    print(set_card_category.category_coliumn_df)