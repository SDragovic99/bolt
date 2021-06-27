const alphabeticalSorter = (fa, fb) => {
    if(fa < fb){ 
        return -1
    }
    if(fa > fb){
        return 1
    }
    return 0
}