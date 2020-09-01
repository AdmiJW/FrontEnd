/* =================================================================================

Remember that when we set up foreign keys for table, we used
ON DELETE keyword?

ON DELETE keyword is used to deal with situations when an
entry in a table gets deleted, which the entry has its primary
key set as foreign key in another table.
Since MYSQL requires associating the foreign key to an actual
entry in the target table, when the entry gets deleted,
how it can deal with the situation? (Foreign key points
to an entry which is deleted!)

It deals with this situation in Mainly 2 ways:
>   ON DELETE SET NULL
>   ON DELETE CASCADE

ON DELETE SET NULL basically means it will set the foreign key
to null when the actual entry gets deleted

ON DELETE CASCADE however will delete the entire row in the
table itself when the entry of foreign key gets deleted.
This will result in quite some entries in several tables
to get deleted!


ON DELETE CASCADE is mainly used when the foreign key is the
primary key, which is used in COMPOSITE PRIMARY KEYS,
like in Branch_Supplier Table


================================================================================= */