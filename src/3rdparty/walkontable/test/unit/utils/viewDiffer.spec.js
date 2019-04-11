import ViewDiffer from 'walkontable/utils/viewDiffer';

describe('createLeadsFromOrders', () => {
  it('should complete leads filled with "append" type when previous order wasn\'t exist', () => {
    const vd = new ViewDiffer();

    vd
      .setSize(6)
      .setOffset(0);

    expect(vd.diff()).toEqual([
      ['append', 0],
      ['append', 1],
      ['append', 2],
      ['append', 3],
      ['append', 4],
      ['append', 5],
    ]);
  });

  it('should complete leads filled with "append" type when next order is longer than previous', () => {
    const vd = new ViewDiffer();

    vd
      .setSize(3)
      .setOffset(0)
      .setSize(6)
      .setOffset(0)
      ;

    expect(vd.diff()).toEqual([
      ['none', 0],
      ['none', 1],
      ['none', 2],
      ['append', 3],
      ['append', 4],
      ['append', 5],
    ]);
  });

  it('should complete leads filled with "remove" type when next order is shorter than previous', () => {
    const vd = new ViewDiffer();

    vd
      .setSize(6)
      .setOffset(0)
      .setSize(0)
      .setOffset(0)
      ;

    expect(vd.diff()).toEqual([
      ['remove', 0],
      ['remove', 1],
      ['remove', 2],
      ['remove', 3],
      ['remove', 4],
      ['remove', 5],
    ]);
  });

  describe('scroll down emulation', () => {
    it('should generate correct leads when a new order is shifted by 1 step down according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(6)
        .setOffset(1)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 1, 0],
        ['none', 2],
        ['none', 3],
        ['none', 4],
        ['none', 5],
        ['append', 6],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps down according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(6)
        .setOffset(3)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 3, 0],
        ['replace', 4, 1],
        ['replace', 5, 2],
        ['append', 6],
        ['append', 7],
        ['append', 8],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 5 steps down according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(6)
        .setOffset(5)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 5, 0],
        ['replace', 6, 1],
        ['replace', 7, 2],
        ['replace', 8, 3],
        ['replace', 9, 4],
        ['append', 10],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 10 steps down according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(6)
        .setOffset(10)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 10, 0],
        ['replace', 11, 1],
        ['replace', 12, 2],
        ['replace', 13, 3],
        ['replace', 14, 4],
        ['replace', 15, 5],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps down and is longer (by 4 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(10)
        .setOffset(3)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 3, 0],
        ['replace', 4, 1],
        ['replace', 5, 2],
        ['append', 6],
        ['append', 7],
        ['append', 8],
        ['append', 9],
        ['append', 10],
        ['append', 11],
        ['append', 12],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 7 steps down and is longer (by 2 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(7)
        .setOffset(2)
        .setSize(8)
        .setOffset(9)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 9, 2],
        ['replace', 10, 3],
        ['replace', 11, 4],
        ['replace', 12, 5],
        ['replace', 13, 6],
        ['replace', 14, 7],
        ['replace', 15, 8],
        ['append', 16],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps down and is shorter (by 3 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(3)
        .setOffset(3)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 3, 0],
        ['replace', 4, 1],
        ['replace', 5, 2],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 30 steps down and is shorter (3 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(0)
        .setSize(3)
        .setOffset(30)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 30, 0],
        ['replace', 31, 1],
        ['replace', 32, 2],
        ['remove', 3],
        ['remove', 4],
        ['remove', 5],
      ]);
    });

    it(`should generate correct leads when a new order is shifted by 2 steps down, is shorter (by 1 item) according to the previous order
        (force generating "replace" and "append" types)`, () => {
      const vd = new ViewDiffer();

      vd
        .setSize(9)
        .setOffset(19)
        .setSize(8)
        .setOffset(21)
        ;

      expect(vd.diff()).toEqual([
        ['replace', 21, 19],
        ['replace', 22, 20],
        ['none', 23],
        ['none', 24],
        ['none', 25],
        ['none', 26],
        ['none', 27],
        ['append', 28],
      ]);
    });
  });

  describe('scroll up emulation', () => {
    it('should generate correct leads when a new order is shifted by 1 step up according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(6)
        .setOffset(19)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 19, 20, 25],
        ['none', 20],
        ['none', 21],
        ['none', 22],
        ['none', 23],
        ['none', 24],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps up according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(6)
        .setOffset(17)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 17, 20, 25],
        ['insert', 18, 20, 24],
        ['insert', 19, 20, 23],
        ['none', 20],
        ['none', 21],
        ['none', 22],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 5 steps up according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(6)
        .setOffset(15)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 15, 20, 25],
        ['insert', 16, 20, 24],
        ['insert', 17, 20, 23],
        ['insert', 18, 20, 22],
        ['insert', 19, 20, 21],
        ['none', 20],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 10 steps up according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(6)
        .setOffset(10)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 10, 20, 25],
        ['insert', 11, 20, 24],
        ['insert', 12, 20, 23],
        ['insert', 13, 20, 22],
        ['insert', 14, 20, 21],
        ['insert', 15, 20, 20],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps up and is longer (by 2 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(8)
        .setOffset(17)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 17, 20, 25],
        ['insert', 18, 20, 24],
        ['insert', 19, 20, 23],
        ['none', 20],
        ['none', 21],
        ['none', 22],
        ['append', 23],
        ['append', 24],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 7 steps up and is longer (by 2 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(8)
        .setOffset(13)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 13, 20, 25],
        ['insert', 14, 20, 24],
        ['insert', 15, 20, 23],
        ['insert', 16, 20, 22],
        ['insert', 17, 20, 21],
        ['insert', 18, 20, 20],
        ['append', 19],
        ['append', 20],
      ]);
    });

    it('should generate correct leads when a new order is shifted by 3 steps up and is shorter (by 4 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(7)
        .setOffset(20)
        .setSize(3)
        .setOffset(17)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 17, 20, 26],
        ['insert', 18, 20, 25],
        ['insert', 19, 20, 24],
        ['remove', 20],
        ['remove', 21],
        ['remove', 22],
        ['remove', 23],
      ]);

      {
        const vd = new ViewDiffer();

        vd
          .setSize(7)
          .setOffset(20)
          .setSize(3)
          .setOffset(24)
          ;

        expect(vd.diff()).toEqual([
          ['replace', 24, 20],
          ['replace', 25, 21],
          ['replace', 26, 22],
          ['remove', 23],
        ]);
      }
    });

    it('should generate correct leads when a new order is shifted by 20 steps up and is shorter (by 3 items) according to the previous order', () => {
      const vd = new ViewDiffer();

      vd
        .setSize(6)
        .setOffset(20)
        .setSize(3)
        .setOffset(0)
        ;

      expect(vd.diff()).toEqual([
        ['insert', 0, 20, 25],
        ['insert', 1, 20, 24],
        ['insert', 2, 20, 23],
        ['remove', 20],
        ['remove', 21],
        ['remove', 22],
      ]);
    });
  });
});