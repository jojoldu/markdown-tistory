import {PostListResponseDto} from 'src/main/api/post/list/PostListResponseDto'

test("응답 객체의 상태를 dto로 변환한다", () => {
    const apiResponse = {
        "tistory": {
            "status": "200",
            "item": {
                "url": "http://oauth-test.tistory.com",
                "secondaryUrl": "",
                "page": "1",
                "count": "10",
                "totalCount": "181",
                "posts": [
                    {
                        "id": "201",
                        "title": "테스트 입니다.",
                        "postUrl": "http://oauth-test.tistory.com/201",
                        "visibility": "0",
                        "categoryId": "0",
                        "comments": "0",
                        "trackbacks": "0",
                        "date": "2018-06-01 17:54:28"
                    },
                ]
            }
        }
    };

    const dto = new PostListResponseDto(apiResponse);
    expect(dto.isNotOk()).toBe(true);
})