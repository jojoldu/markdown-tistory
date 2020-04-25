import {LocalImagePathCollection} from 'src/main/service/image/dto/LocalImagePathCollection'

test("로컬 경로를 가진 이미지들만 뽑아낸다", () => {
    const expect1 = "../images/티스토리.png";
    const expect2 = "../images/티스토리클라이언트.png";
    const fixture = `![티스토리](${expect1}) ![](${expect2}) ![URL](https://test.com)`;

    const result = new LocalImagePathCollection(fixture);

    expect(result.localImages).toHaveLength(2);
    expect(result.localImages[0]).toBe(expect1);
    expect(result.localImages[1]).toBe(expect2);
})