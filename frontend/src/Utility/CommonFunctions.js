
export const FormatedDateFunction=(date)=>{
     const Datee = new Date(date);
        return Datee.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',  // "June"
            day: 'numeric'  // "14"
        });
}