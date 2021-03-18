interface IPaginate {
	arr: Array<any>;
	size: number;
}

async function paginate ({arr, size}: IPaginate): Promise<any[]> {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, [])
}

export default paginate;
