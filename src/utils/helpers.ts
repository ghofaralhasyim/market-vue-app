export const generateRandomID = (length: number): string => {
    const char = '23456789abcdefghijklmnopqrstuvwxyz';
    const charLength = char.length;
    let id = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charLength);
      id += char.charAt(randomIndex);
    }
    
    return id;
}

const numPrefix = (num: number) => {
		let prefixed: string = num.toString()
		if (num < 10) {
			prefixed = '0' + num
		}

		return prefixed
  }

  const months: any = {
		id: {
			short: 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des'.split('_'),
			full: 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split(
				'_'
			)
		},
		en: {
			short: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Agt_Sep_Oct_Nov_Dec'.split('_'),
			full: 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
				'_'
			)
		}
  }
  
  const days: any = {
		id: {
			short: 'Ming_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
			full: 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_')
		},
		en: {
			short: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
			full: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
				'_'
			)
		}
	}
  
  export const formatFullDate = (date: string, monthLength = 'short', lang = 'en'): string => {
    const parseDate = new Date(date.replace(/-/g, '/'));
    const day = parseDate.getDate();
    const month = parseDate.getMonth();
    const year = parseDate.getFullYear();
    const dayOfWeek = parseDate.getDay();

    const monthName = months[lang][monthLength][month];
    const dayName = days[lang][monthLength][dayOfWeek];

    return `${dayName}, ${numPrefix(day)} ${monthName} ${year}`;
  };