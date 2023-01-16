class myClass ():
    def myFunction():
        d = {'col1': [1, 2], 'col2': [3, 4]}
        dataframe = pd.DataFrame(data=d)
        sumdata = dataframe["col1"] + dataframe["col2"]
        dataframe['Sum'] = sumdata
        return dataframe
